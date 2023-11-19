import dayjs from 'dayjs/esm';

export interface IBitcoinOverview {
  id: number;
  bitcoinPrice?: number | null;
  marketCap?: number | null;
  exchangeVolume?: number | null;
  timestamp?: dayjs.Dayjs | null;
  currency?: string | null;
  volumeChange24h?: number | null;
  percentChange1h?: number | null;
  percentChange24h?: number | null;
  percentChange7d?: number | null;
  percentChange30d?: number | null;
  percentChange60d?: number | null;
  percentChange90d?: number | null;
}

export type NewBitcoinOverview = Omit<IBitcoinOverview, 'id'> & { id: null };
