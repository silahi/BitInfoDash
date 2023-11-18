import dayjs from 'dayjs/esm';

import { IOHLCVT1d, NewOHLCVT1d } from './ohlcvt-1-d.model';

export const sampleWithRequiredData: IOHLCVT1d = {
  id: 15345,
};

export const sampleWithPartialData: IOHLCVT1d = {
  id: 28511,
  open: 16811.37,
  low: 21772.12,
  volume: 13804,
};

export const sampleWithFullData: IOHLCVT1d = {
  id: 17150,
  timestamp: dayjs('2023-11-09T16:14'),
  open: 13292.41,
  high: 33.48,
  low: 16640.02,
  close: 31617.42,
  volume: 27458,
  trades: 11909,
};

export const sampleWithNewData: NewOHLCVT1d = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
