import dayjs from 'dayjs/esm';

import { IOHLCVT1m, NewOHLCVT1m } from './ohlcvt-1-m.model';

export const sampleWithRequiredData: IOHLCVT1m = {
  id: 11157,
};

export const sampleWithPartialData: IOHLCVT1m = {
  id: 6779,
  timestamp: dayjs('2023-11-09T21:55'),
  low: 12092.87,
  volume: 21168,
  trades: 2634,
};

export const sampleWithFullData: IOHLCVT1m = {
  id: 1295,
  timestamp: dayjs('2023-11-10T05:26'),
  open: 20959.6,
  high: 2113.53,
  low: 3093.23,
  close: 4224.7,
  volume: 9370,
  trades: 12970,
};

export const sampleWithNewData: NewOHLCVT1m = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
