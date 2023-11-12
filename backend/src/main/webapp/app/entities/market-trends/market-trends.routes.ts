import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import { MarketTrendsComponent } from './list/market-trends.component';
import { MarketTrendsDetailComponent } from './detail/market-trends-detail.component';
import { MarketTrendsUpdateComponent } from './update/market-trends-update.component';
import MarketTrendsResolve from './route/market-trends-routing-resolve.service';

const marketTrendsRoute: Routes = [
  {
    path: '',
    component: MarketTrendsComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: MarketTrendsDetailComponent,
    resolve: {
      marketTrends: MarketTrendsResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: MarketTrendsUpdateComponent,
    resolve: {
      marketTrends: MarketTrendsResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: MarketTrendsUpdateComponent,
    resolve: {
      marketTrends: MarketTrendsResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default marketTrendsRoute;
