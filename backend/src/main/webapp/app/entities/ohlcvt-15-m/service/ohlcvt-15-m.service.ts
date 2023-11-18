import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { map } from 'rxjs/operators';

import dayjs from 'dayjs/esm';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IOHLCVT15m, NewOHLCVT15m } from '../ohlcvt-15-m.model';

export type PartialUpdateOHLCVT15m = Partial<IOHLCVT15m> & Pick<IOHLCVT15m, 'id'>;

type RestOf<T extends IOHLCVT15m | NewOHLCVT15m> = Omit<T, 'timestamp'> & {
  timestamp?: string | null;
};

export type RestOHLCVT15m = RestOf<IOHLCVT15m>;

export type NewRestOHLCVT15m = RestOf<NewOHLCVT15m>;

export type PartialUpdateRestOHLCVT15m = RestOf<PartialUpdateOHLCVT15m>;

export type EntityResponseType = HttpResponse<IOHLCVT15m>;
export type EntityArrayResponseType = HttpResponse<IOHLCVT15m[]>;

@Injectable({ providedIn: 'root' })
export class OHLCVT15mService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/ohlcvt-15-ms');

  constructor(
    protected http: HttpClient,
    protected applicationConfigService: ApplicationConfigService,
  ) {}

  create(oHLCVT15m: NewOHLCVT15m): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(oHLCVT15m);
    return this.http
      .post<RestOHLCVT15m>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  update(oHLCVT15m: IOHLCVT15m): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(oHLCVT15m);
    return this.http
      .put<RestOHLCVT15m>(`${this.resourceUrl}/${this.getOHLCVT15mIdentifier(oHLCVT15m)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  partialUpdate(oHLCVT15m: PartialUpdateOHLCVT15m): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(oHLCVT15m);
    return this.http
      .patch<RestOHLCVT15m>(`${this.resourceUrl}/${this.getOHLCVT15mIdentifier(oHLCVT15m)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<RestOHLCVT15m>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestOHLCVT15m[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getOHLCVT15mIdentifier(oHLCVT15m: Pick<IOHLCVT15m, 'id'>): number {
    return oHLCVT15m.id;
  }

  compareOHLCVT15m(o1: Pick<IOHLCVT15m, 'id'> | null, o2: Pick<IOHLCVT15m, 'id'> | null): boolean {
    return o1 && o2 ? this.getOHLCVT15mIdentifier(o1) === this.getOHLCVT15mIdentifier(o2) : o1 === o2;
  }

  addOHLCVT15mToCollectionIfMissing<Type extends Pick<IOHLCVT15m, 'id'>>(
    oHLCVT15mCollection: Type[],
    ...oHLCVT15msToCheck: (Type | null | undefined)[]
  ): Type[] {
    const oHLCVT15ms: Type[] = oHLCVT15msToCheck.filter(isPresent);
    if (oHLCVT15ms.length > 0) {
      const oHLCVT15mCollectionIdentifiers = oHLCVT15mCollection.map(oHLCVT15mItem => this.getOHLCVT15mIdentifier(oHLCVT15mItem)!);
      const oHLCVT15msToAdd = oHLCVT15ms.filter(oHLCVT15mItem => {
        const oHLCVT15mIdentifier = this.getOHLCVT15mIdentifier(oHLCVT15mItem);
        if (oHLCVT15mCollectionIdentifiers.includes(oHLCVT15mIdentifier)) {
          return false;
        }
        oHLCVT15mCollectionIdentifiers.push(oHLCVT15mIdentifier);
        return true;
      });
      return [...oHLCVT15msToAdd, ...oHLCVT15mCollection];
    }
    return oHLCVT15mCollection;
  }

  protected convertDateFromClient<T extends IOHLCVT15m | NewOHLCVT15m | PartialUpdateOHLCVT15m>(oHLCVT15m: T): RestOf<T> {
    return {
      ...oHLCVT15m,
      timestamp: oHLCVT15m.timestamp?.toJSON() ?? null,
    };
  }

  protected convertDateFromServer(restOHLCVT15m: RestOHLCVT15m): IOHLCVT15m {
    return {
      ...restOHLCVT15m,
      timestamp: restOHLCVT15m.timestamp ? dayjs(restOHLCVT15m.timestamp) : undefined,
    };
  }

  protected convertResponseFromServer(res: HttpResponse<RestOHLCVT15m>): HttpResponse<IOHLCVT15m> {
    return res.clone({
      body: res.body ? this.convertDateFromServer(res.body) : null,
    });
  }

  protected convertResponseArrayFromServer(res: HttpResponse<RestOHLCVT15m[]>): HttpResponse<IOHLCVT15m[]> {
    return res.clone({
      body: res.body ? res.body.map(item => this.convertDateFromServer(item)) : null,
    });
  }
}
