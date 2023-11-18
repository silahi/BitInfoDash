import dayjs from 'dayjs/esm';

export interface IOHLCVT1h {
  id: number;
  timestamp?: dayjs.Dayjs | null;
  open?: number | null;
  high?: number | null;
  low?: number | null;
  close?: number | null;
  volume?: number | null;
  trades?: number | null;
}

export type NewOHLCVT1h = Omit<IOHLCVT1h, 'id'> & { id: null };
