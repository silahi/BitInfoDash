import dayjs from 'dayjs/esm';

export interface IOHLCVT1m {
  id: number;
  timestamp?: dayjs.Dayjs | null;
  open?: number | null;
  high?: number | null;
  low?: number | null;
  close?: number | null;
  volume?: number | null;
  trades?: number | null;
}

export type NewOHLCVT1m = Omit<IOHLCVT1m, 'id'> & { id: null };
