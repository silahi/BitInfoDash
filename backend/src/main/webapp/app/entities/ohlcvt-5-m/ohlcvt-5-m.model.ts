import dayjs from 'dayjs/esm';

export interface IOHLCVT5m {
  id: number;
  timestamp?: dayjs.Dayjs | null;
  open?: number | null;
  high?: number | null;
  low?: number | null;
  close?: number | null;
  volume?: number | null;
  trades?: number | null;
}

export type NewOHLCVT5m = Omit<IOHLCVT5m, 'id'> & { id: null };
