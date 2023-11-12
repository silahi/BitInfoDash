import { inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of, EMPTY, Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IMarketTrends } from '../market-trends.model';
import { MarketTrendsService } from '../service/market-trends.service';

export const marketTrendsResolve = (route: ActivatedRouteSnapshot): Observable<null | IMarketTrends> => {
  const id = route.params['id'];
  if (id) {
    return inject(MarketTrendsService)
      .find(id)
      .pipe(
        mergeMap((marketTrends: HttpResponse<IMarketTrends>) => {
          if (marketTrends.body) {
            return of(marketTrends.body);
          } else {
            inject(Router).navigate(['404']);
            return EMPTY;
          }
        }),
      );
  }
  return of(null);
};

export default marketTrendsResolve;
