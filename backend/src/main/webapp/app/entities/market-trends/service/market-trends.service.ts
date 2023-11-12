import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { map } from 'rxjs/operators';

import dayjs from 'dayjs/esm';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IMarketTrends, NewMarketTrends } from '../market-trends.model';

export type PartialUpdateMarketTrends = Partial<IMarketTrends> & Pick<IMarketTrends, 'id'>;

type RestOf<T extends IMarketTrends | NewMarketTrends> = Omit<T, 'timestamp'> & {
  timestamp?: string | null;
};

export type RestMarketTrends = RestOf<IMarketTrends>;

export type NewRestMarketTrends = RestOf<NewMarketTrends>;

export type PartialUpdateRestMarketTrends = RestOf<PartialUpdateMarketTrends>;

export type EntityResponseType = HttpResponse<IMarketTrends>;
export type EntityArrayResponseType = HttpResponse<IMarketTrends[]>;

@Injectable({ providedIn: 'root' })
export class MarketTrendsService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/market-trends');

  constructor(
    protected http: HttpClient,
    protected applicationConfigService: ApplicationConfigService,
  ) {}

  create(marketTrends: NewMarketTrends): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(marketTrends);
    return this.http
      .post<RestMarketTrends>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  update(marketTrends: IMarketTrends): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(marketTrends);
    return this.http
      .put<RestMarketTrends>(`${this.resourceUrl}/${this.getMarketTrendsIdentifier(marketTrends)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  partialUpdate(marketTrends: PartialUpdateMarketTrends): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(marketTrends);
    return this.http
      .patch<RestMarketTrends>(`${this.resourceUrl}/${this.getMarketTrendsIdentifier(marketTrends)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<RestMarketTrends>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestMarketTrends[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getMarketTrendsIdentifier(marketTrends: Pick<IMarketTrends, 'id'>): number {
    return marketTrends.id;
  }

  compareMarketTrends(o1: Pick<IMarketTrends, 'id'> | null, o2: Pick<IMarketTrends, 'id'> | null): boolean {
    return o1 && o2 ? this.getMarketTrendsIdentifier(o1) === this.getMarketTrendsIdentifier(o2) : o1 === o2;
  }

  addMarketTrendsToCollectionIfMissing<Type extends Pick<IMarketTrends, 'id'>>(
    marketTrendsCollection: Type[],
    ...marketTrendsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const marketTrends: Type[] = marketTrendsToCheck.filter(isPresent);
    if (marketTrends.length > 0) {
      const marketTrendsCollectionIdentifiers = marketTrendsCollection.map(
        marketTrendsItem => this.getMarketTrendsIdentifier(marketTrendsItem)!,
      );
      const marketTrendsToAdd = marketTrends.filter(marketTrendsItem => {
        const marketTrendsIdentifier = this.getMarketTrendsIdentifier(marketTrendsItem);
        if (marketTrendsCollectionIdentifiers.includes(marketTrendsIdentifier)) {
          return false;
        }
        marketTrendsCollectionIdentifiers.push(marketTrendsIdentifier);
        return true;
      });
      return [...marketTrendsToAdd, ...marketTrendsCollection];
    }
    return marketTrendsCollection;
  }

  protected convertDateFromClient<T extends IMarketTrends | NewMarketTrends | PartialUpdateMarketTrends>(marketTrends: T): RestOf<T> {
    return {
      ...marketTrends,
      timestamp: marketTrends.timestamp?.toJSON() ?? null,
    };
  }

  protected convertDateFromServer(restMarketTrends: RestMarketTrends): IMarketTrends {
    return {
      ...restMarketTrends,
      timestamp: restMarketTrends.timestamp ? dayjs(restMarketTrends.timestamp) : undefined,
    };
  }

  protected convertResponseFromServer(res: HttpResponse<RestMarketTrends>): HttpResponse<IMarketTrends> {
    return res.clone({
      body: res.body ? this.convertDateFromServer(res.body) : null,
    });
  }

  protected convertResponseArrayFromServer(res: HttpResponse<RestMarketTrends[]>): HttpResponse<IMarketTrends[]> {
    return res.clone({
      body: res.body ? res.body.map(item => this.convertDateFromServer(item)) : null,
    });
  }
}
