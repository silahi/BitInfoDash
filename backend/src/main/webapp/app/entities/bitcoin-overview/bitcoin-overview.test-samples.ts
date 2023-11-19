import dayjs from 'dayjs/esm';

import { IBitcoinOverview, NewBitcoinOverview } from './bitcoin-overview.model';

export const sampleWithRequiredData: IBitcoinOverview = {
  id: 3826,
};

export const sampleWithPartialData: IBitcoinOverview = {
  id: 22336,
  bitcoinPrice: 27522.06,
  marketCap: 21149.36,
  percentChange1h: 11830.77,
  percentChange7d: 14879.25,
  percentChange30d: 19465.81,
};

export const sampleWithFullData: IBitcoinOverview = {
  id: 9462,
  bitcoinPrice: 3030.69,
  marketCap: 25951.93,
  exchangeVolume: 9424.75,
  timestamp: dayjs('2023-11-09T07:10'),
  currency: 'équipe',
  volumeChange24h: 366.37,
  percentChange1h: 706.68,
  percentChange24h: 2237.89,
  percentChange7d: 1634.4,
  percentChange30d: 21973.15,
  percentChange60d: 1589.76,
  percentChange90d: 20004.33,
};

export const sampleWithNewData: NewBitcoinOverview = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
