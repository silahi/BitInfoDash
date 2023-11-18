import dayjs from 'dayjs/esm';

export interface IOHLCVT1d {
  id: number;
  timestamp?: dayjs.Dayjs | null;
  open?: number | null;
  high?: number | null;
  low?: number | null;
  close?: number | null;
  volume?: number | null;
  trades?: number | null;
}

export type NewOHLCVT1d = Omit<IOHLCVT1d, 'id'> & { id: null };
