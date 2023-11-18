import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import { OHLCVT12hComponent } from './list/ohlcvt-12-h.component';
import { OHLCVT12hDetailComponent } from './detail/ohlcvt-12-h-detail.component';
import { OHLCVT12hUpdateComponent } from './update/ohlcvt-12-h-update.component';
import OHLCVT12hResolve from './route/ohlcvt-12-h-routing-resolve.service';

const oHLCVT12hRoute: Routes = [
  {
    path: '',
    component: OHLCVT12hComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: OHLCVT12hDetailComponent,
    resolve: {
      oHLCVT12h: OHLCVT12hResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: OHLCVT12hUpdateComponent,
    resolve: {
      oHLCVT12h: OHLCVT12hResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: OHLCVT12hUpdateComponent,
    resolve: {
      oHLCVT12h: OHLCVT12hResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default oHLCVT12hRoute;
