import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import { OHLCVT15mComponent } from './list/ohlcvt-15-m.component';
import { OHLCVT15mDetailComponent } from './detail/ohlcvt-15-m-detail.component';
import { OHLCVT15mUpdateComponent } from './update/ohlcvt-15-m-update.component';
import OHLCVT15mResolve from './route/ohlcvt-15-m-routing-resolve.service';

const oHLCVT15mRoute: Routes = [
  {
    path: '',
    component: OHLCVT15mComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: OHLCVT15mDetailComponent,
    resolve: {
      oHLCVT15m: OHLCVT15mResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: OHLCVT15mUpdateComponent,
    resolve: {
      oHLCVT15m: OHLCVT15mResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: OHLCVT15mUpdateComponent,
    resolve: {
      oHLCVT15m: OHLCVT15mResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default oHLCVT15mRoute;
