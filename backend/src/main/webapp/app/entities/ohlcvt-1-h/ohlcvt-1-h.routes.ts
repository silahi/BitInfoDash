import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import { OHLCVT1hComponent } from './list/ohlcvt-1-h.component';
import { OHLCVT1hDetailComponent } from './detail/ohlcvt-1-h-detail.component';
import { OHLCVT1hUpdateComponent } from './update/ohlcvt-1-h-update.component';
import OHLCVT1hResolve from './route/ohlcvt-1-h-routing-resolve.service';

const oHLCVT1hRoute: Routes = [
  {
    path: '',
    component: OHLCVT1hComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: OHLCVT1hDetailComponent,
    resolve: {
      oHLCVT1h: OHLCVT1hResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: OHLCVT1hUpdateComponent,
    resolve: {
      oHLCVT1h: OHLCVT1hResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: OHLCVT1hUpdateComponent,
    resolve: {
      oHLCVT1h: OHLCVT1hResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default oHLCVT1hRoute;
