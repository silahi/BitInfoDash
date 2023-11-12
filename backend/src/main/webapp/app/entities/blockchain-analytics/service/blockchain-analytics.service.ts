import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { map } from 'rxjs/operators';

import dayjs from 'dayjs/esm';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IBlockchainAnalytics, NewBlockchainAnalytics } from '../blockchain-analytics.model';

export type PartialUpdateBlockchainAnalytics = Partial<IBlockchainAnalytics> & Pick<IBlockchainAnalytics, 'id'>;

type RestOf<T extends IBlockchainAnalytics | NewBlockchainAnalytics> = Omit<T, 'timestamp'> & {
  timestamp?: string | null;
};

export type RestBlockchainAnalytics = RestOf<IBlockchainAnalytics>;

export type NewRestBlockchainAnalytics = RestOf<NewBlockchainAnalytics>;

export type PartialUpdateRestBlockchainAnalytics = RestOf<PartialUpdateBlockchainAnalytics>;

export type EntityResponseType = HttpResponse<IBlockchainAnalytics>;
export type EntityArrayResponseType = HttpResponse<IBlockchainAnalytics[]>;

@Injectable({ providedIn: 'root' })
export class BlockchainAnalyticsService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/blockchain-analytics');

  constructor(
    protected http: HttpClient,
    protected applicationConfigService: ApplicationConfigService,
  ) {}

  create(blockchainAnalytics: NewBlockchainAnalytics): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(blockchainAnalytics);
    return this.http
      .post<RestBlockchainAnalytics>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  update(blockchainAnalytics: IBlockchainAnalytics): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(blockchainAnalytics);
    return this.http
      .put<RestBlockchainAnalytics>(`${this.resourceUrl}/${this.getBlockchainAnalyticsIdentifier(blockchainAnalytics)}`, copy, {
        observe: 'response',
      })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  partialUpdate(blockchainAnalytics: PartialUpdateBlockchainAnalytics): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(blockchainAnalytics);
    return this.http
      .patch<RestBlockchainAnalytics>(`${this.resourceUrl}/${this.getBlockchainAnalyticsIdentifier(blockchainAnalytics)}`, copy, {
        observe: 'response',
      })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<RestBlockchainAnalytics>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestBlockchainAnalytics[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getBlockchainAnalyticsIdentifier(blockchainAnalytics: Pick<IBlockchainAnalytics, 'id'>): number {
    return blockchainAnalytics.id;
  }

  compareBlockchainAnalytics(o1: Pick<IBlockchainAnalytics, 'id'> | null, o2: Pick<IBlockchainAnalytics, 'id'> | null): boolean {
    return o1 && o2 ? this.getBlockchainAnalyticsIdentifier(o1) === this.getBlockchainAnalyticsIdentifier(o2) : o1 === o2;
  }

  addBlockchainAnalyticsToCollectionIfMissing<Type extends Pick<IBlockchainAnalytics, 'id'>>(
    blockchainAnalyticsCollection: Type[],
    ...blockchainAnalyticsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const blockchainAnalytics: Type[] = blockchainAnalyticsToCheck.filter(isPresent);
    if (blockchainAnalytics.length > 0) {
      const blockchainAnalyticsCollectionIdentifiers = blockchainAnalyticsCollection.map(
        blockchainAnalyticsItem => this.getBlockchainAnalyticsIdentifier(blockchainAnalyticsItem)!,
      );
      const blockchainAnalyticsToAdd = blockchainAnalytics.filter(blockchainAnalyticsItem => {
        const blockchainAnalyticsIdentifier = this.getBlockchainAnalyticsIdentifier(blockchainAnalyticsItem);
        if (blockchainAnalyticsCollectionIdentifiers.includes(blockchainAnalyticsIdentifier)) {
          return false;
        }
        blockchainAnalyticsCollectionIdentifiers.push(blockchainAnalyticsIdentifier);
        return true;
      });
      return [...blockchainAnalyticsToAdd, ...blockchainAnalyticsCollection];
    }
    return blockchainAnalyticsCollection;
  }

  protected convertDateFromClient<T extends IBlockchainAnalytics | NewBlockchainAnalytics | PartialUpdateBlockchainAnalytics>(
    blockchainAnalytics: T,
  ): RestOf<T> {
    return {
      ...blockchainAnalytics,
      timestamp: blockchainAnalytics.timestamp?.toJSON() ?? null,
    };
  }

  protected convertDateFromServer(restBlockchainAnalytics: RestBlockchainAnalytics): IBlockchainAnalytics {
    return {
      ...restBlockchainAnalytics,
      timestamp: restBlockchainAnalytics.timestamp ? dayjs(restBlockchainAnalytics.timestamp) : undefined,
    };
  }

  protected convertResponseFromServer(res: HttpResponse<RestBlockchainAnalytics>): HttpResponse<IBlockchainAnalytics> {
    return res.clone({
      body: res.body ? this.convertDateFromServer(res.body) : null,
    });
  }

  protected convertResponseArrayFromServer(res: HttpResponse<RestBlockchainAnalytics[]>): HttpResponse<IBlockchainAnalytics[]> {
    return res.clone({
      body: res.body ? res.body.map(item => this.convertDateFromServer(item)) : null,
    });
  }
}
