import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { map } from 'rxjs/operators';

import dayjs from 'dayjs/esm';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IOHLCVT1m, NewOHLCVT1m } from '../ohlcvt-1-m.model';

export type PartialUpdateOHLCVT1m = Partial<IOHLCVT1m> & Pick<IOHLCVT1m, 'id'>;

type RestOf<T extends IOHLCVT1m | NewOHLCVT1m> = Omit<T, 'timestamp'> & {
  timestamp?: string | null;
};

export type RestOHLCVT1m = RestOf<IOHLCVT1m>;

export type NewRestOHLCVT1m = RestOf<NewOHLCVT1m>;

export type PartialUpdateRestOHLCVT1m = RestOf<PartialUpdateOHLCVT1m>;

export type EntityResponseType = HttpResponse<IOHLCVT1m>;
export type EntityArrayResponseType = HttpResponse<IOHLCVT1m[]>;

@Injectable({ providedIn: 'root' })
export class OHLCVT1mService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/ohlcvt-1-ms');

  constructor(
    protected http: HttpClient,
    protected applicationConfigService: ApplicationConfigService,
  ) {}

  create(oHLCVT1m: NewOHLCVT1m): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(oHLCVT1m);
    return this.http
      .post<RestOHLCVT1m>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  update(oHLCVT1m: IOHLCVT1m): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(oHLCVT1m);
    return this.http
      .put<RestOHLCVT1m>(`${this.resourceUrl}/${this.getOHLCVT1mIdentifier(oHLCVT1m)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  partialUpdate(oHLCVT1m: PartialUpdateOHLCVT1m): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(oHLCVT1m);
    return this.http
      .patch<RestOHLCVT1m>(`${this.resourceUrl}/${this.getOHLCVT1mIdentifier(oHLCVT1m)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<RestOHLCVT1m>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestOHLCVT1m[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getOHLCVT1mIdentifier(oHLCVT1m: Pick<IOHLCVT1m, 'id'>): number {
    return oHLCVT1m.id;
  }

  compareOHLCVT1m(o1: Pick<IOHLCVT1m, 'id'> | null, o2: Pick<IOHLCVT1m, 'id'> | null): boolean {
    return o1 && o2 ? this.getOHLCVT1mIdentifier(o1) === this.getOHLCVT1mIdentifier(o2) : o1 === o2;
  }

  addOHLCVT1mToCollectionIfMissing<Type extends Pick<IOHLCVT1m, 'id'>>(
    oHLCVT1mCollection: Type[],
    ...oHLCVT1msToCheck: (Type | null | undefined)[]
  ): Type[] {
    const oHLCVT1ms: Type[] = oHLCVT1msToCheck.filter(isPresent);
    if (oHLCVT1ms.length > 0) {
      const oHLCVT1mCollectionIdentifiers = oHLCVT1mCollection.map(oHLCVT1mItem => this.getOHLCVT1mIdentifier(oHLCVT1mItem)!);
      const oHLCVT1msToAdd = oHLCVT1ms.filter(oHLCVT1mItem => {
        const oHLCVT1mIdentifier = this.getOHLCVT1mIdentifier(oHLCVT1mItem);
        if (oHLCVT1mCollectionIdentifiers.includes(oHLCVT1mIdentifier)) {
          return false;
        }
        oHLCVT1mCollectionIdentifiers.push(oHLCVT1mIdentifier);
        return true;
      });
      return [...oHLCVT1msToAdd, ...oHLCVT1mCollection];
    }
    return oHLCVT1mCollection;
  }

  protected convertDateFromClient<T extends IOHLCVT1m | NewOHLCVT1m | PartialUpdateOHLCVT1m>(oHLCVT1m: T): RestOf<T> {
    return {
      ...oHLCVT1m,
      timestamp: oHLCVT1m.timestamp?.toJSON() ?? null,
    };
  }

  protected convertDateFromServer(restOHLCVT1m: RestOHLCVT1m): IOHLCVT1m {
    return {
      ...restOHLCVT1m,
      timestamp: restOHLCVT1m.timestamp ? dayjs(restOHLCVT1m.timestamp) : undefined,
    };
  }

  protected convertResponseFromServer(res: HttpResponse<RestOHLCVT1m>): HttpResponse<IOHLCVT1m> {
    return res.clone({
      body: res.body ? this.convertDateFromServer(res.body) : null,
    });
  }

  protected convertResponseArrayFromServer(res: HttpResponse<RestOHLCVT1m[]>): HttpResponse<IOHLCVT1m[]> {
    return res.clone({
      body: res.body ? res.body.map(item => this.convertDateFromServer(item)) : null,
    });
  }
}
