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
    }
];
