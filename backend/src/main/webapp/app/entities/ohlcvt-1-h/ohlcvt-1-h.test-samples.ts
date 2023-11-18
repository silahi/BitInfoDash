import dayjs from 'dayjs/esm';

import { IOHLCVT1h, NewOHLCVT1h } from './ohlcvt-1-h.model';

export const sampleWithRequiredData: IOHLCVT1h = {
  id: 242,
};

export const sampleWithPartialData: IOHLCVT1h = {
  id: 394,
  open: 25651.28,
  high: 10617.63,
  close: 5404.76,
  volume: 14398,
  trades: 9594,
};

export const sampleWithFullData: IOHLCVT1h = {
  id: 28404,
  timestamp: dayjs('2023-11-09T13:46'),
  open: 2213.05,
  high: 22973.91,
  low: 80.14,
  close: 10459.8,
  volume: 12173,
  trades: 4860,
};

export const sampleWithNewData: NewOHLCVT1h = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
