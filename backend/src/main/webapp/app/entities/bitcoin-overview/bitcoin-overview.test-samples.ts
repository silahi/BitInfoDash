import dayjs from 'dayjs/esm';

import { IBitcoinOverview, NewBitcoinOverview } from './bitcoin-overview.model';

export const sampleWithRequiredData: IBitcoinOverview = {
  id: 23817,
};

export const sampleWithPartialData: IBitcoinOverview = {
  id: 8552,
  recentVariation: 10545.73,
  timestamp: dayjs('2023-11-09T14:38'),
  currency: 'quitte à ouah corps enseignant',
};

export const sampleWithFullData: IBitcoinOverview = {
  id: 4391,
  bitcoinPrice: 9023.6,
  marketCap: 26999.6,
  exchangeVolume: 32599.47,
  recentVariation: 55.2,
  timestamp: dayjs('2023-11-09T12:19'),
  currency: 'crac',
};

export const sampleWithNewData: NewBitcoinOverview = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
