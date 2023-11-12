import { inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of, EMPTY, Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { INetworkSecurity } from '../network-security.model';
import { NetworkSecurityService } from '../service/network-security.service';

export const networkSecurityResolve = (route: ActivatedRouteSnapshot): Observable<null | INetworkSecurity> => {
  const id = route.params['id'];
  if (id) {
    return inject(NetworkSecurityService)
      .find(id)
      .pipe(
        mergeMap((networkSecurity: HttpResponse<INetworkSecurity>) => {
          if (networkSecurity.body) {
            return of(networkSecurity.body);
          } else {
            inject(Router).navigate(['404']);
            return EMPTY;
          }
        }),
      );
  }
  return of(null);
};

export default networkSecurityResolve;
