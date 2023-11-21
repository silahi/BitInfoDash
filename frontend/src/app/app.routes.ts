import { Route } from '@angular/router';

export const appRoutes: Route[] = [
    {
        path: "",
        loadComponent: () =>
            import('@bit-info-dash/bitcoin-overview').then(c => c.BitcoinOverviewComponent),
    },
    {
        path: "bitcoin-overview",
        loadComponent: () =>
            import('@bit-info-dash/bitcoin-overview').then(c => c.BitcoinOverviewComponent),
    },
    {
        path: "blockchain-analysis",
        loadComponent: () =>
            import('@bit-info-dash/blockchain-analysis').then(c => c.BlockchainAnalysisComponent),
    },
    {
        path: "address-tracking",
        loadComponent: () =>
            import('@bit-info-dash/address-tracking').then(c => c.AddressTrackingComponent),
    },
    {
        path: "market-trends",
        loadComponent: () =>
            import('@bit-info-dash/market-trends').then(c => c.MarketTrendsComponent),
    },
    {
        path: "network-security",
        loadComponent: () =>
            import('@bit-info-dash/network-security').then(c => c.NetworkSecurityComponent),
    },
];
