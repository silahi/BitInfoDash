import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { map } from 'rxjs/operators';

import dayjs from 'dayjs/esm';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { ITransactions, NewTransactions } from '../transactions.model';

export type PartialUpdateTransactions = Partial<ITransactions> & Pick<ITransactions, 'id'>;

type RestOf<T extends ITransactions | NewTransactions> = Omit<T, 'transactionDate'> & {
  transactionDate?: string | null;
};

export type RestTransactions = RestOf<ITransactions>;

export type NewRestTransactions = RestOf<NewTransactions>;

export type PartialUpdateRestTransactions = RestOf<PartialUpdateTransactions>;

export type EntityResponseType = HttpResponse<ITransactions>;
export type EntityArrayResponseType = HttpResponse<ITransactions[]>;

@Injectable({ providedIn: 'root' })
export class TransactionsService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/transactions');

  constructor(
    protected http: HttpClient,
    protected applicationConfigService: ApplicationConfigService,
  ) {}

  create(transactions: NewTransactions): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(transactions);
    return this.http
      .post<RestTransactions>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  update(transactions: ITransactions): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(transactions);
    return this.http
      .put<RestTransactions>(`${this.resourceUrl}/${this.getTransactionsIdentifier(transactions)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  partialUpdate(transactions: PartialUpdateTransactions): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(transactions);
    return this.http
      .patch<RestTransactions>(`${this.resourceUrl}/${this.getTransactionsIdentifier(transactions)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<RestTransactions>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestTransactions[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getTransactionsIdentifier(transactions: Pick<ITransactions, 'id'>): number {
    return transactions.id;
  }

  compareTransactions(o1: Pick<ITransactions, 'id'> | null, o2: Pick<ITransactions, 'id'> | null): boolean {
    return o1 && o2 ? this.getTransactionsIdentifier(o1) === this.getTransactionsIdentifier(o2) : o1 === o2;
  }

  addTransactionsToCollectionIfMissing<Type extends Pick<ITransactions, 'id'>>(
    transactionsCollection: Type[],
    ...transactionsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const transactions: Type[] = transactionsToCheck.filter(isPresent);
    if (transactions.length > 0) {
      const transactionsCollectionIdentifiers = transactionsCollection.map(
        transactionsItem => this.getTransactionsIdentifier(transactionsItem)!,
      );
      const transactionsToAdd = transactions.filter(transactionsItem => {
        const transactionsIdentifier = this.getTransactionsIdentifier(transactionsItem);
        if (transactionsCollectionIdentifiers.includes(transactionsIdentifier)) {
          return false;
        }
        transactionsCollectionIdentifiers.push(transactionsIdentifier);
        return true;
      });
      return [...transactionsToAdd, ...transactionsCollection];
    }
    return transactionsCollection;
  }

  protected convertDateFromClient<T extends ITransactions | NewTransactions | PartialUpdateTransactions>(transactions: T): RestOf<T> {
    return {
      ...transactions,
      transactionDate: transactions.transactionDate?.toJSON() ?? null,
    };
  }

  protected convertDateFromServer(restTransactions: RestTransactions): ITransactions {
    return {
      ...restTransactions,
      transactionDate: restTransactions.transactionDate ? dayjs(restTransactions.transactionDate) : undefined,
    };
  }

  protected convertResponseFromServer(res: HttpResponse<RestTransactions>): HttpResponse<ITransactions> {
    return res.clone({
      body: res.body ? this.convertDateFromServer(res.body) : null,
    });
  }

  protected convertResponseArrayFromServer(res: HttpResponse<RestTransactions[]>): HttpResponse<ITransactions[]> {
    return res.clone({
      body: res.body ? res.body.map(item => this.convertDateFromServer(item)) : null,
    });
  }
}
