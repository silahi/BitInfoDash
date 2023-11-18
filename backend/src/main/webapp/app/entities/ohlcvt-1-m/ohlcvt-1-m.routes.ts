import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import { OHLCVT1mComponent } from './list/ohlcvt-1-m.component';
import { OHLCVT1mDetailComponent } from './detail/ohlcvt-1-m-detail.component';
import { OHLCVT1mUpdateComponent } from './update/ohlcvt-1-m-update.component';
import OHLCVT1mResolve from './route/ohlcvt-1-m-routing-resolve.service';

const oHLCVT1mRoute: Routes = [
  {
    path: '',
    component: OHLCVT1mComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: OHLCVT1mDetailComponent,
    resolve: {
      oHLCVT1m: OHLCVT1mResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: OHLCVT1mUpdateComponent,
    resolve: {
      oHLCVT1m: OHLCVT1mResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: OHLCVT1mUpdateComponent,
    resolve: {
      oHLCVT1m: OHLCVT1mResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default oHLCVT1mRoute;
