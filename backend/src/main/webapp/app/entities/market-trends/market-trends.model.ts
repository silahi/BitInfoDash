import dayjs from 'dayjs/esm';

export interface IMarketTrends {
  id: number;
  trendName?: string | null;
  indicatorValue?: number | null;
  timestamp?: dayjs.Dayjs | null;
  trendType?: string | null;
}

export type NewMarketTrends = Omit<IMarketTrends, 'id'> & { id: null };
