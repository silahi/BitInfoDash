import dayjs from 'dayjs/esm';

import { IMarketTrends, NewMarketTrends } from './market-trends.model';

export const sampleWithRequiredData: IMarketTrends = {
  id: 2456,
};

export const sampleWithPartialData: IMarketTrends = {
  id: 30880,
  trendName: 'pourpre peu',
  indicatorValue: 15696.14,
};

export const sampleWithFullData: IMarketTrends = {
  id: 12022,
  trendName: 'ouin depuis areu areu',
  indicatorValue: 12628.36,
  timestamp: dayjs('2023-11-10T03:37'),
  trendType: 'lorsque dans',
};

export const sampleWithNewData: NewMarketTrends = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
