import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { map } from 'rxjs/operators';

import dayjs from 'dayjs/esm';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IOHLCVT12h, NewOHLCVT12h } from '../ohlcvt-12-h.model';

export type PartialUpdateOHLCVT12h = Partial<IOHLCVT12h> & Pick<IOHLCVT12h, 'id'>;

type RestOf<T extends IOHLCVT12h | NewOHLCVT12h> = Omit<T, 'timestamp'> & {
  timestamp?: string | null;
};

export type RestOHLCVT12h = RestOf<IOHLCVT12h>;

export type NewRestOHLCVT12h = RestOf<NewOHLCVT12h>;

export type PartialUpdateRestOHLCVT12h = RestOf<PartialUpdateOHLCVT12h>;

export type EntityResponseType = HttpResponse<IOHLCVT12h>;
export type EntityArrayResponseType = HttpResponse<IOHLCVT12h[]>;

@Injectable({ providedIn: 'root' })
export class OHLCVT12hService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/ohlcvt-12-hs');

  constructor(
    protected http: HttpClient,
    protected applicationConfigService: ApplicationConfigService,
  ) {}

  create(oHLCVT12h: NewOHLCVT12h): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(oHLCVT12h);
    return this.http
      .post<RestOHLCVT12h>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  update(oHLCVT12h: IOHLCVT12h): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(oHLCVT12h);
    return this.http
      .put<RestOHLCVT12h>(`${this.resourceUrl}/${this.getOHLCVT12hIdentifier(oHLCVT12h)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  partialUpdate(oHLCVT12h: PartialUpdateOHLCVT12h): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(oHLCVT12h);
    return this.http
      .patch<RestOHLCVT12h>(`${this.resourceUrl}/${this.getOHLCVT12hIdentifier(oHLCVT12h)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<RestOHLCVT12h>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestOHLCVT12h[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getOHLCVT12hIdentifier(oHLCVT12h: Pick<IOHLCVT12h, 'id'>): number {
    return oHLCVT12h.id;
  }

  compareOHLCVT12h(o1: Pick<IOHLCVT12h, 'id'> | null, o2: Pick<IOHLCVT12h, 'id'> | null): boolean {
    return o1 && o2 ? this.getOHLCVT12hIdentifier(o1) === this.getOHLCVT12hIdentifier(o2) : o1 === o2;
  }

  addOHLCVT12hToCollectionIfMissing<Type extends Pick<IOHLCVT12h, 'id'>>(
    oHLCVT12hCollection: Type[],
    ...oHLCVT12hsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const oHLCVT12hs: Type[] = oHLCVT12hsToCheck.filter(isPresent);
    if (oHLCVT12hs.length > 0) {
      const oHLCVT12hCollectionIdentifiers = oHLCVT12hCollection.map(oHLCVT12hItem => this.getOHLCVT12hIdentifier(oHLCVT12hItem)!);
      const oHLCVT12hsToAdd = oHLCVT12hs.filter(oHLCVT12hItem => {
        const oHLCVT12hIdentifier = this.getOHLCVT12hIdentifier(oHLCVT12hItem);
        if (oHLCVT12hCollectionIdentifiers.includes(oHLCVT12hIdentifier)) {
          return false;
        }
        oHLCVT12hCollectionIdentifiers.push(oHLCVT12hIdentifier);
        return true;
      });
      return [...oHLCVT12hsToAdd, ...oHLCVT12hCollection];
    }
    return oHLCVT12hCollection;
  }

  protected convertDateFromClient<T extends IOHLCVT12h | NewOHLCVT12h | PartialUpdateOHLCVT12h>(oHLCVT12h: T): RestOf<T> {
    return {
      ...oHLCVT12h,
      timestamp: oHLCVT12h.timestamp?.toJSON() ?? null,
    };
  }

  protected convertDateFromServer(restOHLCVT12h: RestOHLCVT12h): IOHLCVT12h {
    return {
      ...restOHLCVT12h,
      timestamp: restOHLCVT12h.timestamp ? dayjs(restOHLCVT12h.timestamp) : undefined,
    };
  }

  protected convertResponseFromServer(res: HttpResponse<RestOHLCVT12h>): HttpResponse<IOHLCVT12h> {
    return res.clone({
      body: res.body ? this.convertDateFromServer(res.body) : null,
    });
  }

  protected convertResponseArrayFromServer(res: HttpResponse<RestOHLCVT12h[]>): HttpResponse<IOHLCVT12h[]> {
    return res.clone({
      body: res.body ? res.body.map(item => this.convertDateFromServer(item)) : null,
    });
  }
}
