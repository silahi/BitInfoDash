import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import { OHLCVT1dComponent } from './list/ohlcvt-1-d.component';
import { OHLCVT1dDetailComponent } from './detail/ohlcvt-1-d-detail.component';
import { OHLCVT1dUpdateComponent } from './update/ohlcvt-1-d-update.component';
import OHLCVT1dResolve from './route/ohlcvt-1-d-routing-resolve.service';

const oHLCVT1dRoute: Routes = [
  {
    path: '',
    component: OHLCVT1dComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: OHLCVT1dDetailComponent,
    resolve: {
      oHLCVT1d: OHLCVT1dResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: OHLCVT1dUpdateComponent,
    resolve: {
      oHLCVT1d: OHLCVT1dResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: OHLCVT1dUpdateComponent,
    resolve: {
      oHLCVT1d: OHLCVT1dResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default oHLCVT1dRoute;
