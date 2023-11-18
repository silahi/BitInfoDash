import dayjs from 'dayjs/esm';

export interface IOHLCVT12h {
  id: number;
  timestamp?: dayjs.Dayjs | null;
  open?: number | null;
  high?: number | null;
  low?: number | null;
  close?: number | null;
  volume?: number | null;
  trades?: number | null;
}

export type NewOHLCVT12h = Omit<IOHLCVT12h, 'id'> & { id: null };
