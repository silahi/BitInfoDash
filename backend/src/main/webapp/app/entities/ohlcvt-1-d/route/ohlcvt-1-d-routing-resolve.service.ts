import { inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of, EMPTY, Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IOHLCVT1d } from '../ohlcvt-1-d.model';
import { OHLCVT1dService } from '../service/ohlcvt-1-d.service';

export const oHLCVT1dResolve = (route: ActivatedRouteSnapshot): Observable<null | IOHLCVT1d> => {
  const id = route.params['id'];
  if (id) {
    return inject(OHLCVT1dService)
      .find(id)
      .pipe(
        mergeMap((oHLCVT1d: HttpResponse<IOHLCVT1d>) => {
          if (oHLCVT1d.body) {
            return of(oHLCVT1d.body);
          } else {
            inject(Router).navigate(['404']);
            return EMPTY;
          }
        }),
      );
  }
  return of(null);
};

export default oHLCVT1dResolve;
