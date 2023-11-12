import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import { NetworkSecurityComponent } from './list/network-security.component';
import { NetworkSecurityDetailComponent } from './detail/network-security-detail.component';
import { NetworkSecurityUpdateComponent } from './update/network-security-update.component';
import NetworkSecurityResolve from './route/network-security-routing-resolve.service';

const networkSecurityRoute: Routes = [
  {
    path: '',
    component: NetworkSecurityComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: NetworkSecurityDetailComponent,
    resolve: {
      networkSecurity: NetworkSecurityResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: NetworkSecurityUpdateComponent,
    resolve: {
      networkSecurity: NetworkSecurityResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: NetworkSecurityUpdateComponent,
    resolve: {
      networkSecurity: NetworkSecurityResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default networkSecurityRoute;
