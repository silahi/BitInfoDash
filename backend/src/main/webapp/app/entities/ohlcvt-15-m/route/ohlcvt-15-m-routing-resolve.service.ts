import { inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of, EMPTY, Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IOHLCVT15m } from '../ohlcvt-15-m.model';
import { OHLCVT15mService } from '../service/ohlcvt-15-m.service';

export const oHLCVT15mResolve = (route: ActivatedRouteSnapshot): Observable<null | IOHLCVT15m> => {
  const id = route.params['id'];
  if (id) {
    return inject(OHLCVT15mService)
      .find(id)
      .pipe(
        mergeMap((oHLCVT15m: HttpResponse<IOHLCVT15m>) => {
          if (oHLCVT15m.body) {
            return of(oHLCVT15m.body);
          } else {
            inject(Router).navigate(['404']);
            return EMPTY;
          }
        }),
      );
  }
  return of(null);
};

export default oHLCVT15mResolve;
