import dayjs from 'dayjs/esm';

export interface IBitcoinOverview {
  id: number;
  bitcoinPrice?: number | null;
  marketCap?: number | null;
  exchangeVolume?: number | null;
  recentVariation?: number | null;
  timestamp?: dayjs.Dayjs | null;
  currency?: string | null;
}

export type NewBitcoinOverview = Omit<IBitcoinOverview, 'id'> & { id: null };
