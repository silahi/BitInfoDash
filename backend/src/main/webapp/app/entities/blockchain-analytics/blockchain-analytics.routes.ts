import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import { BlockchainAnalyticsComponent } from './list/blockchain-analytics.component';
import { BlockchainAnalyticsDetailComponent } from './detail/blockchain-analytics-detail.component';
import { BlockchainAnalyticsUpdateComponent } from './update/blockchain-analytics-update.component';
import BlockchainAnalyticsResolve from './route/blockchain-analytics-routing-resolve.service';

const blockchainAnalyticsRoute: Routes = [
  {
    path: '',
    component: BlockchainAnalyticsComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: BlockchainAnalyticsDetailComponent,
    resolve: {
      blockchainAnalytics: BlockchainAnalyticsResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: BlockchainAnalyticsUpdateComponent,
    resolve: {
      blockchainAnalytics: BlockchainAnalyticsResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: BlockchainAnalyticsUpdateComponent,
    resolve: {
      blockchainAnalytics: BlockchainAnalyticsResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default blockchainAnalyticsRoute;
