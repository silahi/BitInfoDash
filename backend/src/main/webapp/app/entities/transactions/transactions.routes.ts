import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import { TransactionsComponent } from './list/transactions.component';
import { TransactionsDetailComponent } from './detail/transactions-detail.component';
import { TransactionsUpdateComponent } from './update/transactions-update.component';
import TransactionsResolve from './route/transactions-routing-resolve.service';

const transactionsRoute: Routes = [
  {
    path: '',
    component: TransactionsComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: TransactionsDetailComponent,
    resolve: {
      transactions: TransactionsResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: TransactionsUpdateComponent,
    resolve: {
      transactions: TransactionsResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: TransactionsUpdateComponent,
    resolve: {
      transactions: TransactionsResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default transactionsRoute;
