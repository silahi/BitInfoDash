import { inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of, EMPTY, Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IOHLCVT5m } from '../ohlcvt-5-m.model';
import { OHLCVT5mService } from '../service/ohlcvt-5-m.service';

export const oHLCVT5mResolve = (route: ActivatedRouteSnapshot): Observable<null | IOHLCVT5m> => {
  const id = route.params['id'];
  if (id) {
    return inject(OHLCVT5mService)
      .find(id)
      .pipe(
        mergeMap((oHLCVT5m: HttpResponse<IOHLCVT5m>) => {
          if (oHLCVT5m.body) {
            return of(oHLCVT5m.body);
          } else {
            inject(Router).navigate(['404']);
            return EMPTY;
          }
        }),
      );
  }
  return of(null);
};

export default oHLCVT5mResolve;
