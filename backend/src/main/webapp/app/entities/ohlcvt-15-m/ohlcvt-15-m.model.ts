import dayjs from 'dayjs/esm';

export interface IOHLCVT15m {
  id: number;
  timestamp?: dayjs.Dayjs | null;
  open?: number | null;
  high?: number | null;
  low?: number | null;
  close?: number | null;
  volume?: number | null;
  trades?: number | null;
}

export type NewOHLCVT15m = Omit<IOHLCVT15m, 'id'> & { id: null };
