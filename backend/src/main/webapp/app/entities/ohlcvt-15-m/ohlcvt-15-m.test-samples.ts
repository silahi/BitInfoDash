import dayjs from 'dayjs/esm';

import { IOHLCVT15m, NewOHLCVT15m } from './ohlcvt-15-m.model';

export const sampleWithRequiredData: IOHLCVT15m = {
  id: 20448,
};

export const sampleWithPartialData: IOHLCVT15m = {
  id: 24950,
  open: 28743.95,
  low: 27190.86,
  close: 9408.57,
  volume: 23137,
  trades: 9519,
};

export const sampleWithFullData: IOHLCVT15m = {
  id: 12246,
  timestamp: dayjs('2023-11-09T16:54'),
  open: 8994.49,
  high: 3558.98,
  low: 23852.38,
  close: 18729.36,
  volume: 13272,
  trades: 15998,
};

export const sampleWithNewData: NewOHLCVT15m = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
