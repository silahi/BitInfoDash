import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'bitcoin-overview',
        data: { pageTitle: 'bitinfodashApp.bitcoinOverview.home.title' },
        loadChildren: () => import('./bitcoin-overview/bitcoin-overview.routes'),
      },
      {
        path: 'blockchain-analytics',
        data: { pageTitle: 'bitinfodashApp.blockchainAnalytics.home.title' },
        loadChildren: () => import('./blockchain-analytics/blockchain-analytics.routes'),
      },
      {
        path: 'bitcoin-address',
        data: { pageTitle: 'bitinfodashApp.bitcoinAddress.home.title' },
        loadChildren: () => import('./bitcoin-address/bitcoin-address.routes'),
      },
      {
        path: 'transactions',
        data: { pageTitle: 'bitinfodashApp.transactions.home.title' },
        loadChildren: () => import('./transactions/transactions.routes'),
      },
      {
        path: 'market-trends',
        data: { pageTitle: 'bitinfodashApp.marketTrends.home.title' },
        loadChildren: () => import('./market-trends/market-trends.routes'),
      },
      {
        path: 'network-security',
        data: { pageTitle: 'bitinfodashApp.networkSecurity.home.title' },
        loadChildren: () => import('./network-security/network-security.routes'),
      },
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class EntityRoutingModule {}
