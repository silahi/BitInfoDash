import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import { BitcoinOverviewComponent } from './list/bitcoin-overview.component';
import { BitcoinOverviewDetailComponent } from './detail/bitcoin-overview-detail.component';
import { BitcoinOverviewUpdateComponent } from './update/bitcoin-overview-update.component';
import BitcoinOverviewResolve from './route/bitcoin-overview-routing-resolve.service';

const bitcoinOverviewRoute: Routes = [
  {
    path: '',
    component: BitcoinOverviewComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: BitcoinOverviewDetailComponent,
    resolve: {
      bitcoinOverview: BitcoinOverviewResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: BitcoinOverviewUpdateComponent,
    resolve: {
      bitcoinOverview: BitcoinOverviewResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: BitcoinOverviewUpdateComponent,
    resolve: {
      bitcoinOverview: BitcoinOverviewResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default bitcoinOverviewRoute;
