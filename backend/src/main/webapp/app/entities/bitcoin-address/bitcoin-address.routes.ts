import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import { BitcoinAddressComponent } from './list/bitcoin-address.component';
import { BitcoinAddressDetailComponent } from './detail/bitcoin-address-detail.component';
import { BitcoinAddressUpdateComponent } from './update/bitcoin-address-update.component';
import BitcoinAddressResolve from './route/bitcoin-address-routing-resolve.service';

const bitcoinAddressRoute: Routes = [
  {
    path: '',
    component: BitcoinAddressComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: BitcoinAddressDetailComponent,
    resolve: {
      bitcoinAddress: BitcoinAddressResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: BitcoinAddressUpdateComponent,
    resolve: {
      bitcoinAddress: BitcoinAddressResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: BitcoinAddressUpdateComponent,
    resolve: {
      bitcoinAddress: BitcoinAddressResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default bitcoinAddressRoute;
