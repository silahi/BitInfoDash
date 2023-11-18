import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { map } from 'rxjs/operators';

import dayjs from 'dayjs/esm';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IOHLCVT1d, NewOHLCVT1d } from '../ohlcvt-1-d.model';

export type PartialUpdateOHLCVT1d = Partial<IOHLCVT1d> & Pick<IOHLCVT1d, 'id'>;

type RestOf<T extends IOHLCVT1d | NewOHLCVT1d> = Omit<T, 'timestamp'> & {
  timestamp?: string | null;
};

export type RestOHLCVT1d = RestOf<IOHLCVT1d>;

export type NewRestOHLCVT1d = RestOf<NewOHLCVT1d>;

export type PartialUpdateRestOHLCVT1d = RestOf<PartialUpdateOHLCVT1d>;

export type EntityResponseType = HttpResponse<IOHLCVT1d>;
export type EntityArrayResponseType = HttpResponse<IOHLCVT1d[]>;

@Injectable({ providedIn: 'root' })
export class OHLCVT1dService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/ohlcvt-1-ds');

  constructor(
    protected http: HttpClient,
    protected applicationConfigService: ApplicationConfigService,
  ) {}

  create(oHLCVT1d: NewOHLCVT1d): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(oHLCVT1d);
    return this.http
      .post<RestOHLCVT1d>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  update(oHLCVT1d: IOHLCVT1d): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(oHLCVT1d);
    return this.http
      .put<RestOHLCVT1d>(`${this.resourceUrl}/${this.getOHLCVT1dIdentifier(oHLCVT1d)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  partialUpdate(oHLCVT1d: PartialUpdateOHLCVT1d): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(oHLCVT1d);
    return this.http
      .patch<RestOHLCVT1d>(`${this.resourceUrl}/${this.getOHLCVT1dIdentifier(oHLCVT1d)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<RestOHLCVT1d>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestOHLCVT1d[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getOHLCVT1dIdentifier(oHLCVT1d: Pick<IOHLCVT1d, 'id'>): number {
    return oHLCVT1d.id;
  }

  compareOHLCVT1d(o1: Pick<IOHLCVT1d, 'id'> | null, o2: Pick<IOHLCVT1d, 'id'> | null): boolean {
    return o1 && o2 ? this.getOHLCVT1dIdentifier(o1) === this.getOHLCVT1dIdentifier(o2) : o1 === o2;
  }

  addOHLCVT1dToCollectionIfMissing<Type extends Pick<IOHLCVT1d, 'id'>>(
    oHLCVT1dCollection: Type[],
    ...oHLCVT1dsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const oHLCVT1ds: Type[] = oHLCVT1dsToCheck.filter(isPresent);
    if (oHLCVT1ds.length > 0) {
      const oHLCVT1dCollectionIdentifiers = oHLCVT1dCollection.map(oHLCVT1dItem => this.getOHLCVT1dIdentifier(oHLCVT1dItem)!);
      const oHLCVT1dsToAdd = oHLCVT1ds.filter(oHLCVT1dItem => {
        const oHLCVT1dIdentifier = this.getOHLCVT1dIdentifier(oHLCVT1dItem);
        if (oHLCVT1dCollectionIdentifiers.includes(oHLCVT1dIdentifier)) {
          return false;
        }
        oHLCVT1dCollectionIdentifiers.push(oHLCVT1dIdentifier);
        return true;
      });
      return [...oHLCVT1dsToAdd, ...oHLCVT1dCollection];
    }
    return oHLCVT1dCollection;
  }

  protected convertDateFromClient<T extends IOHLCVT1d | NewOHLCVT1d | PartialUpdateOHLCVT1d>(oHLCVT1d: T): RestOf<T> {
    return {
      ...oHLCVT1d,
      timestamp: oHLCVT1d.timestamp?.toJSON() ?? null,
    };
  }

  protected convertDateFromServer(restOHLCVT1d: RestOHLCVT1d): IOHLCVT1d {
    return {
      ...restOHLCVT1d,
      timestamp: restOHLCVT1d.timestamp ? dayjs(restOHLCVT1d.timestamp) : undefined,
    };
  }

  protected convertResponseFromServer(res: HttpResponse<RestOHLCVT1d>): HttpResponse<IOHLCVT1d> {
    return res.clone({
      body: res.body ? this.convertDateFromServer(res.body) : null,
    });
  }

  protected convertResponseArrayFromServer(res: HttpResponse<RestOHLCVT1d[]>): HttpResponse<IOHLCVT1d[]> {
    return res.clone({
      body: res.body ? res.body.map(item => this.convertDateFromServer(item)) : null,
    });
  }
}
