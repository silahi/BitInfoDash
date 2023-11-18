import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import { OHLCVT5mComponent } from './list/ohlcvt-5-m.component';
import { OHLCVT5mDetailComponent } from './detail/ohlcvt-5-m-detail.component';
import { OHLCVT5mUpdateComponent } from './update/ohlcvt-5-m-update.component';
import OHLCVT5mResolve from './route/ohlcvt-5-m-routing-resolve.service';

const oHLCVT5mRoute: Routes = [
  {
    path: '',
    component: OHLCVT5mComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: OHLCVT5mDetailComponent,
    resolve: {
      oHLCVT5m: OHLCVT5mResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: OHLCVT5mUpdateComponent,
    resolve: {
      oHLCVT5m: OHLCVT5mResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: OHLCVT5mUpdateComponent,
    resolve: {
      oHLCVT5m: OHLCVT5mResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default oHLCVT5mRoute;
