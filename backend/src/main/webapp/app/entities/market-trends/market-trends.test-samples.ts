import dayjs from 'dayjs/esm';

import { IMarketTrends, NewMarketTrends } from './market-trends.model';

export const sampleWithRequiredData: IMarketTrends = {
  id: 14758,
};

export const sampleWithPartialData: IMarketTrends = {
  id: 6614,
  trendName: 'aïe',
  indicatorValue: 30971.5,
  timestamp: dayjs('2023-11-09T16:18'),
  trendType: 'mériter',
};

export const sampleWithFullData: IMarketTrends = {
  id: 20580,
  trendName: 'jouir jusqu’à ce que puisque',
  indicatorValue: 27987.5,
  timestamp: dayjs('2023-11-09T21:08'),
  trendType: 'broum',
};

export const sampleWithNewData: NewMarketTrends = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
