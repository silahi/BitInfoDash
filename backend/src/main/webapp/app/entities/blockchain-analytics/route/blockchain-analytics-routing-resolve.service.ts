import { inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of, EMPTY, Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IBlockchainAnalytics } from '../blockchain-analytics.model';
import { BlockchainAnalyticsService } from '../service/blockchain-analytics.service';

export const blockchainAnalyticsResolve = (route: ActivatedRouteSnapshot): Observable<null | IBlockchainAnalytics> => {
  const id = route.params['id'];
  if (id) {
    return inject(BlockchainAnalyticsService)
      .find(id)
      .pipe(
        mergeMap((blockchainAnalytics: HttpResponse<IBlockchainAnalytics>) => {
          if (blockchainAnalytics.body) {
            return of(blockchainAnalytics.body);
          } else {
            inject(Router).navigate(['404']);
            return EMPTY;
          }
        }),
      );
  }
  return of(null);
};

export default blockchainAnalyticsResolve;
