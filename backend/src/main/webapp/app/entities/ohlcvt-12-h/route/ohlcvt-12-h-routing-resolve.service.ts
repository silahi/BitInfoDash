import { inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of, EMPTY, Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IOHLCVT12h } from '../ohlcvt-12-h.model';
import { OHLCVT12hService } from '../service/ohlcvt-12-h.service';

export const oHLCVT12hResolve = (route: ActivatedRouteSnapshot): Observable<null | IOHLCVT12h> => {
  const id = route.params['id'];
  if (id) {
    return inject(OHLCVT12hService)
      .find(id)
      .pipe(
        mergeMap((oHLCVT12h: HttpResponse<IOHLCVT12h>) => {
          if (oHLCVT12h.body) {
            return of(oHLCVT12h.body);
          } else {
            inject(Router).navigate(['404']);
            return EMPTY;
          }
        }),
      );
  }
  return of(null);
};

export default oHLCVT12hResolve;
