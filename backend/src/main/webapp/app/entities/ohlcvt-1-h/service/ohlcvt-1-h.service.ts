import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { map } from 'rxjs/operators';

import dayjs from 'dayjs/esm';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IOHLCVT1h, NewOHLCVT1h } from '../ohlcvt-1-h.model';

export type PartialUpdateOHLCVT1h = Partial<IOHLCVT1h> & Pick<IOHLCVT1h, 'id'>;

type RestOf<T extends IOHLCVT1h | NewOHLCVT1h> = Omit<T, 'timestamp'> & {
  timestamp?: string | null;
};

export type RestOHLCVT1h = RestOf<IOHLCVT1h>;

export type NewRestOHLCVT1h = RestOf<NewOHLCVT1h>;

export type PartialUpdateRestOHLCVT1h = RestOf<PartialUpdateOHLCVT1h>;

export type EntityResponseType = HttpResponse<IOHLCVT1h>;
export type EntityArrayResponseType = HttpResponse<IOHLCVT1h[]>;

@Injectable({ providedIn: 'root' })
export class OHLCVT1hService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/ohlcvt-1-hs');

  constructor(
    protected http: HttpClient,
    protected applicationConfigService: ApplicationConfigService,
  ) {}

  create(oHLCVT1h: NewOHLCVT1h): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(oHLCVT1h);
    return this.http
      .post<RestOHLCVT1h>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  update(oHLCVT1h: IOHLCVT1h): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(oHLCVT1h);
    return this.http
      .put<RestOHLCVT1h>(`${this.resourceUrl}/${this.getOHLCVT1hIdentifier(oHLCVT1h)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  partialUpdate(oHLCVT1h: PartialUpdateOHLCVT1h): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(oHLCVT1h);
    return this.http
      .patch<RestOHLCVT1h>(`${this.resourceUrl}/${this.getOHLCVT1hIdentifier(oHLCVT1h)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<RestOHLCVT1h>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestOHLCVT1h[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getOHLCVT1hIdentifier(oHLCVT1h: Pick<IOHLCVT1h, 'id'>): number {
    return oHLCVT1h.id;
  }

  compareOHLCVT1h(o1: Pick<IOHLCVT1h, 'id'> | null, o2: Pick<IOHLCVT1h, 'id'> | null): boolean {
    return o1 && o2 ? this.getOHLCVT1hIdentifier(o1) === this.getOHLCVT1hIdentifier(o2) : o1 === o2;
  }

  addOHLCVT1hToCollectionIfMissing<Type extends Pick<IOHLCVT1h, 'id'>>(
    oHLCVT1hCollection: Type[],
    ...oHLCVT1hsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const oHLCVT1hs: Type[] = oHLCVT1hsToCheck.filter(isPresent);
    if (oHLCVT1hs.length > 0) {
      const oHLCVT1hCollectionIdentifiers = oHLCVT1hCollection.map(oHLCVT1hItem => this.getOHLCVT1hIdentifier(oHLCVT1hItem)!);
      const oHLCVT1hsToAdd = oHLCVT1hs.filter(oHLCVT1hItem => {
        const oHLCVT1hIdentifier = this.getOHLCVT1hIdentifier(oHLCVT1hItem);
        if (oHLCVT1hCollectionIdentifiers.includes(oHLCVT1hIdentifier)) {
          return false;
        }
        oHLCVT1hCollectionIdentifiers.push(oHLCVT1hIdentifier);
        return true;
      });
      return [...oHLCVT1hsToAdd, ...oHLCVT1hCollection];
    }
    return oHLCVT1hCollection;
  }

  protected convertDateFromClient<T extends IOHLCVT1h | NewOHLCVT1h | PartialUpdateOHLCVT1h>(oHLCVT1h: T): RestOf<T> {
    return {
      ...oHLCVT1h,
      timestamp: oHLCVT1h.timestamp?.toJSON() ?? null,
    };
  }

  protected convertDateFromServer(restOHLCVT1h: RestOHLCVT1h): IOHLCVT1h {
    return {
      ...restOHLCVT1h,
      timestamp: restOHLCVT1h.timestamp ? dayjs(restOHLCVT1h.timestamp) : undefined,
    };
  }

  protected convertResponseFromServer(res: HttpResponse<RestOHLCVT1h>): HttpResponse<IOHLCVT1h> {
    return res.clone({
      body: res.body ? this.convertDateFromServer(res.body) : null,
    });
  }

  protected convertResponseArrayFromServer(res: HttpResponse<RestOHLCVT1h[]>): HttpResponse<IOHLCVT1h[]> {
    return res.clone({
      body: res.body ? res.body.map(item => this.convertDateFromServer(item)) : null,
    });
  }
}
