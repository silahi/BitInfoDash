import dayjs from 'dayjs/esm';

import { IOHLCVT12h, NewOHLCVT12h } from './ohlcvt-12-h.model';

export const sampleWithRequiredData: IOHLCVT12h = {
  id: 32464,
};

export const sampleWithPartialData: IOHLCVT12h = {
  id: 24574,
  open: 32094.66,
  close: 12078.91,
  volume: 28404,
  trades: 537,
};

export const sampleWithFullData: IOHLCVT12h = {
  id: 23198,
  timestamp: dayjs('2023-11-09T12:04'),
  open: 29222.6,
  high: 12270.22,
  low: 12367.51,
  close: 2589.54,
  volume: 9571,
  trades: 1278,
};

export const sampleWithNewData: NewOHLCVT12h = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
