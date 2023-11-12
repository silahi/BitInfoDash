import dayjs from 'dayjs/esm';

import { IBitcoinOverview, NewBitcoinOverview } from './bitcoin-overview.model';

export const sampleWithRequiredData: IBitcoinOverview = {
  id: 17301,
};

export const sampleWithPartialData: IBitcoinOverview = {
  id: 29142,
  marketCap: 10669.46,
  recentVariation: 13323,
  currency: 'souple',
};

export const sampleWithFullData: IBitcoinOverview = {
  id: 25930,
  bitcoinPrice: 23403.7,
  marketCap: 28146.04,
  exchangeVolume: 1334.87,
  recentVariation: 6071.25,
  timestamp: dayjs('2023-11-09T12:21'),
  currency: 'derrière',
};

export const sampleWithNewData: NewBitcoinOverview = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
