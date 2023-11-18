import dayjs from 'dayjs/esm';

import { IOHLCVT5m, NewOHLCVT5m } from './ohlcvt-5-m.model';

export const sampleWithRequiredData: IOHLCVT5m = {
  id: 5021,
};

export const sampleWithPartialData: IOHLCVT5m = {
  id: 7136,
  timestamp: dayjs('2023-11-09T12:30'),
  open: 24719.11,
  low: 30308.96,
  close: 16832.77,
};

export const sampleWithFullData: IOHLCVT5m = {
  id: 20311,
  timestamp: dayjs('2023-11-09T15:20'),
  open: 19690.92,
  high: 9417.35,
  low: 14068.97,
  close: 32271.34,
  volume: 6573,
  trades: 30802,
};

export const sampleWithNewData: NewOHLCVT5m = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
