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
      {
        path: 'ohlcvt-1-m',
        data: { pageTitle: 'bitinfodashApp.oHLCVT1m.home.title' },
        loadChildren: () => import('./ohlcvt-1-m/ohlcvt-1-m.routes'),
      },
      {
        path: 'ohlcvt-5-m',
        data: { pageTitle: 'bitinfodashApp.oHLCVT5m.home.title' },
        loadChildren: () => import('./ohlcvt-5-m/ohlcvt-5-m.routes'),
      },
      {
        path: 'ohlcvt-15-m',
        data: { pageTitle: 'bitinfodashApp.oHLCVT15m.home.title' },
        loadChildren: () => import('./ohlcvt-15-m/ohlcvt-15-m.routes'),
      },
      {
        path: 'ohlcvt-1-h',
        data: { pageTitle: 'bitinfodashApp.oHLCVT1h.home.title' },
        loadChildren: () => import('./ohlcvt-1-h/ohlcvt-1-h.routes'),
      },
      {
        path: 'ohlcvt-12-h',
        data: { pageTitle: 'bitinfodashApp.oHLCVT12h.home.title' },
        loadChildren: () => import('./ohlcvt-12-h/ohlcvt-12-h.routes'),
      },
      {
        path: 'ohlcvt-1-d',
        data: { pageTitle: 'bitinfodashApp.oHLCVT1d.home.title' },
        loadChildren: () => import('./ohlcvt-1-d/ohlcvt-1-d.routes'),
      },
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class EntityRoutingModule {}
