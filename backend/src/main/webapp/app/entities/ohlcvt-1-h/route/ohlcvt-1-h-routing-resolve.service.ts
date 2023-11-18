import { inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of, EMPTY, Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IOHLCVT1h } from '../ohlcvt-1-h.model';
import { OHLCVT1hService } from '../service/ohlcvt-1-h.service';

export const oHLCVT1hResolve = (route: ActivatedRouteSnapshot): Observable<null | IOHLCVT1h> => {
  const id = route.params['id'];
  if (id) {
    return inject(OHLCVT1hService)
      .find(id)
      .pipe(
        mergeMap((oHLCVT1h: HttpResponse<IOHLCVT1h>) => {
          if (oHLCVT1h.body) {
            return of(oHLCVT1h.body);
          } else {
            inject(Router).navigate(['404']);
            return EMPTY;
          }
        }),
      );
  }
  return of(null);
};

export default oHLCVT1hResolve;
