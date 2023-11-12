import { inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of, EMPTY, Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IBitcoinAddress } from '../bitcoin-address.model';
import { BitcoinAddressService } from '../service/bitcoin-address.service';

export const bitcoinAddressResolve = (route: ActivatedRouteSnapshot): Observable<null | IBitcoinAddress> => {
  const id = route.params['id'];
  if (id) {
    return inject(BitcoinAddressService)
      .find(id)
      .pipe(
        mergeMap((bitcoinAddress: HttpResponse<IBitcoinAddress>) => {
          if (bitcoinAddress.body) {
            return of(bitcoinAddress.body);
          } else {
            inject(Router).navigate(['404']);
            return EMPTY;
          }
        }),
      );
  }
  return of(null);
};

export default bitcoinAddressResolve;
