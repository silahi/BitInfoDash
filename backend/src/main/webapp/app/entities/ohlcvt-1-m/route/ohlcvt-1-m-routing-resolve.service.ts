import { inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of, EMPTY, Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IOHLCVT1m } from '../ohlcvt-1-m.model';
import { OHLCVT1mService } from '../service/ohlcvt-1-m.service';

export const oHLCVT1mResolve = (route: ActivatedRouteSnapshot): Observable<null | IOHLCVT1m> => {
  const id = route.params['id'];
  if (id) {
    return inject(OHLCVT1mService)
      .find(id)
      .pipe(
        mergeMap((oHLCVT1m: HttpResponse<IOHLCVT1m>) => {
          if (oHLCVT1m.body) {
            return of(oHLCVT1m.body);
          } else {
            inject(Router).navigate(['404']);
            return EMPTY;
          }
        }),
      );
  }
  return of(null);
};

export default oHLCVT1mResolve;
