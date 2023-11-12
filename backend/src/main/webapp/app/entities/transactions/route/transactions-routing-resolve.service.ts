import { inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of, EMPTY, Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ITransactions } from '../transactions.model';
import { TransactionsService } from '../service/transactions.service';

export const transactionsResolve = (route: ActivatedRouteSnapshot): Observable<null | ITransactions> => {
  const id = route.params['id'];
  if (id) {
    return inject(TransactionsService)
      .find(id)
      .pipe(
        mergeMap((transactions: HttpResponse<ITransactions>) => {
          if (transactions.body) {
            return of(transactions.body);
          } else {
            inject(Router).navigate(['404']);
            return EMPTY;
          }
        }),
      );
  }
  return of(null);
};

export default transactionsResolve;
