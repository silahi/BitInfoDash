import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { map } from 'rxjs/operators';

import dayjs from 'dayjs/esm';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IBitcoinOverview, NewBitcoinOverview } from '../bitcoin-overview.model';

export type PartialUpdateBitcoinOverview = Partial<IBitcoinOverview> & Pick<IBitcoinOverview, 'id'>;

type RestOf<T extends IBitcoinOverview | NewBitcoinOverview> = Omit<T, 'timestamp'> & {
  timestamp?: string | null;
};

export type RestBitcoinOverview = RestOf<IBitcoinOverview>;

export type NewRestBitcoinOverview = RestOf<NewBitcoinOverview>;

export type PartialUpdateRestBitcoinOverview = RestOf<PartialUpdateBitcoinOverview>;

export type EntityResponseType = HttpResponse<IBitcoinOverview>;
export type EntityArrayResponseType = HttpResponse<IBitcoinOverview[]>;

@Injectable({ providedIn: 'root' })
export class BitcoinOverviewService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/bitcoin-overviews');

  constructor(
    protected http: HttpClient,
    protected applicationConfigService: ApplicationConfigService,
  ) {}

  create(bitcoinOverview: NewBitcoinOverview): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(bitcoinOverview);
    return this.http
      .post<RestBitcoinOverview>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  update(bitcoinOverview: IBitcoinOverview): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(bitcoinOverview);
    return this.http
      .put<RestBitcoinOverview>(`${this.resourceUrl}/${this.getBitcoinOverviewIdentifier(bitcoinOverview)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  partialUpdate(bitcoinOverview: PartialUpdateBitcoinOverview): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(bitcoinOverview);
    return this.http
      .patch<RestBitcoinOverview>(`${this.resourceUrl}/${this.getBitcoinOverviewIdentifier(bitcoinOverview)}`, copy, {
        observe: 'response',
      })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<RestBitcoinOverview>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestBitcoinOverview[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getBitcoinOverviewIdentifier(bitcoinOverview: Pick<IBitcoinOverview, 'id'>): number {
    return bitcoinOverview.id;
  }

  compareBitcoinOverview(o1: Pick<IBitcoinOverview, 'id'> | null, o2: Pick<IBitcoinOverview, 'id'> | null): boolean {
    return o1 && o2 ? this.getBitcoinOverviewIdentifier(o1) === this.getBitcoinOverviewIdentifier(o2) : o1 === o2;
  }

  addBitcoinOverviewToCollectionIfMissing<Type extends Pick<IBitcoinOverview, 'id'>>(
    bitcoinOverviewCollection: Type[],
    ...bitcoinOverviewsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const bitcoinOverviews: Type[] = bitcoinOverviewsToCheck.filter(isPresent);
    if (bitcoinOverviews.length > 0) {
      const bitcoinOverviewCollectionIdentifiers = bitcoinOverviewCollection.map(
        bitcoinOverviewItem => this.getBitcoinOverviewIdentifier(bitcoinOverviewItem)!,
      );
      const bitcoinOverviewsToAdd = bitcoinOverviews.filter(bitcoinOverviewItem => {
        const bitcoinOverviewIdentifier = this.getBitcoinOverviewIdentifier(bitcoinOverviewItem);
        if (bitcoinOverviewCollectionIdentifiers.includes(bitcoinOverviewIdentifier)) {
          return false;
        }
        bitcoinOverviewCollectionIdentifiers.push(bitcoinOverviewIdentifier);
        return true;
      });
      return [...bitcoinOverviewsToAdd, ...bitcoinOverviewCollection];
    }
    return bitcoinOverviewCollection;
  }

  protected convertDateFromClient<T extends IBitcoinOverview | NewBitcoinOverview | PartialUpdateBitcoinOverview>(
    bitcoinOverview: T,
  ): RestOf<T> {
    return {
      ...bitcoinOverview,
      timestamp: bitcoinOverview.timestamp?.toJSON() ?? null,
    };
  }

  protected convertDateFromServer(restBitcoinOverview: RestBitcoinOverview): IBitcoinOverview {
    return {
      ...restBitcoinOverview,
      timestamp: restBitcoinOverview.timestamp ? dayjs(restBitcoinOverview.timestamp) : undefined,
    };
  }

  protected convertResponseFromServer(res: HttpResponse<RestBitcoinOverview>): HttpResponse<IBitcoinOverview> {
    return res.clone({
      body: res.body ? this.convertDateFromServer(res.body) : null,
    });
  }

  protected convertResponseArrayFromServer(res: HttpResponse<RestBitcoinOverview[]>): HttpResponse<IBitcoinOverview[]> {
    return res.clone({
      body: res.body ? res.body.map(item => this.convertDateFromServer(item)) : null,
    });
  }
}
