import { inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of, EMPTY, Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IBitcoinOverview } from '../bitcoin-overview.model';
import { BitcoinOverviewService } from '../service/bitcoin-overview.service';

export const bitcoinOverviewResolve = (route: ActivatedRouteSnapshot): Observable<null | IBitcoinOverview> => {
  const id = route.params['id'];
  if (id) {
    return inject(BitcoinOverviewService)
      .find(id)
      .pipe(
        mergeMap((bitcoinOverview: HttpResponse<IBitcoinOverview>) => {
          if (bitcoinOverview.body) {
            return of(bitcoinOverview.body);
          } else {
            inject(Router).navigate(['404']);
            return EMPTY;
          }
        }),
      );
  }
  return of(null);
};

export default bitcoinOverviewResolve;
