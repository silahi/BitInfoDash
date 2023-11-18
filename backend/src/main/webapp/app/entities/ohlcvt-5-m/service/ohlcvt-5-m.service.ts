import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { map } from 'rxjs/operators';

import dayjs from 'dayjs/esm';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IOHLCVT5m, NewOHLCVT5m } from '../ohlcvt-5-m.model';

export type PartialUpdateOHLCVT5m = Partial<IOHLCVT5m> & Pick<IOHLCVT5m, 'id'>;

type RestOf<T extends IOHLCVT5m | NewOHLCVT5m> = Omit<T, 'timestamp'> & {
  timestamp?: string | null;
};

export type RestOHLCVT5m = RestOf<IOHLCVT5m>;

export type NewRestOHLCVT5m = RestOf<NewOHLCVT5m>;

export type PartialUpdateRestOHLCVT5m = RestOf<PartialUpdateOHLCVT5m>;

export type EntityResponseType = HttpResponse<IOHLCVT5m>;
export type EntityArrayResponseType = HttpResponse<IOHLCVT5m[]>;

@Injectable({ providedIn: 'root' })
export class OHLCVT5mService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/ohlcvt-5-ms');

  constructor(
    protected http: HttpClient,
    protected applicationConfigService: ApplicationConfigService,
  ) {}

  create(oHLCVT5m: NewOHLCVT5m): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(oHLCVT5m);
    return this.http
      .post<RestOHLCVT5m>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  update(oHLCVT5m: IOHLCVT5m): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(oHLCVT5m);
    return this.http
      .put<RestOHLCVT5m>(`${this.resourceUrl}/${this.getOHLCVT5mIdentifier(oHLCVT5m)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  partialUpdate(oHLCVT5m: PartialUpdateOHLCVT5m): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(oHLCVT5m);
    return this.http
      .patch<RestOHLCVT5m>(`${this.resourceUrl}/${this.getOHLCVT5mIdentifier(oHLCVT5m)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<RestOHLCVT5m>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestOHLCVT5m[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getOHLCVT5mIdentifier(oHLCVT5m: Pick<IOHLCVT5m, 'id'>): number {
    return oHLCVT5m.id;
  }

  compareOHLCVT5m(o1: Pick<IOHLCVT5m, 'id'> | null, o2: Pick<IOHLCVT5m, 'id'> | null): boolean {
    return o1 && o2 ? this.getOHLCVT5mIdentifier(o1) === this.getOHLCVT5mIdentifier(o2) : o1 === o2;
  }

  addOHLCVT5mToCollectionIfMissing<Type extends Pick<IOHLCVT5m, 'id'>>(
    oHLCVT5mCollection: Type[],
    ...oHLCVT5msToCheck: (Type | null | undefined)[]
  ): Type[] {
    const oHLCVT5ms: Type[] = oHLCVT5msToCheck.filter(isPresent);
    if (oHLCVT5ms.length > 0) {
      const oHLCVT5mCollectionIdentifiers = oHLCVT5mCollection.map(oHLCVT5mItem => this.getOHLCVT5mIdentifier(oHLCVT5mItem)!);
      const oHLCVT5msToAdd = oHLCVT5ms.filter(oHLCVT5mItem => {
        const oHLCVT5mIdentifier = this.getOHLCVT5mIdentifier(oHLCVT5mItem);
        if (oHLCVT5mCollectionIdentifiers.includes(oHLCVT5mIdentifier)) {
          return false;
        }
        oHLCVT5mCollectionIdentifiers.push(oHLCVT5mIdentifier);
        return true;
      });
      return [...oHLCVT5msToAdd, ...oHLCVT5mCollection];
    }
    return oHLCVT5mCollection;
  }

  protected convertDateFromClient<T extends IOHLCVT5m | NewOHLCVT5m | PartialUpdateOHLCVT5m>(oHLCVT5m: T): RestOf<T> {
    return {
      ...oHLCVT5m,
      timestamp: oHLCVT5m.timestamp?.toJSON() ?? null,
    };
  }

  protected convertDateFromServer(restOHLCVT5m: RestOHLCVT5m): IOHLCVT5m {
    return {
      ...restOHLCVT5m,
      timestamp: restOHLCVT5m.timestamp ? dayjs(restOHLCVT5m.timestamp) : undefined,
    };
  }

  protected convertResponseFromServer(res: HttpResponse<RestOHLCVT5m>): HttpResponse<IOHLCVT5m> {
    return res.clone({
      body: res.body ? this.convertDateFromServer(res.body) : null,
    });
  }

  protected convertResponseArrayFromServer(res: HttpResponse<RestOHLCVT5m[]>): HttpResponse<IOHLCVT5m[]> {
    return res.clone({
      body: res.body ? res.body.map(item => this.convertDateFromServer(item)) : null,
    });
  }
}
