import dayjs from 'dayjs/esm';

export interface IBlockchainAnalytics {
  id: number;
  transactionCount?: number | null;
  averageTransactionFee?: number | null;
  hashrateDistribution?: string | null;
  timestamp?: dayjs.Dayjs | null;
  difficulty?: number | null;
  networkHashrate?: number | null;
}

export type NewBlockchainAnalytics = Omit<IBlockchainAnalytics, 'id'> & { id: null };
