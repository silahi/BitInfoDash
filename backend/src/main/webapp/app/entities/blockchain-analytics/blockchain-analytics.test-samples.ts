import dayjs from 'dayjs/esm';

import { IBlockchainAnalytics, NewBlockchainAnalytics } from './blockchain-analytics.model';

export const sampleWithRequiredData: IBlockchainAnalytics = {
  id: 17236,
};

export const sampleWithPartialData: IBlockchainAnalytics = {
  id: 5380,
  difficulty: 23606.74,
};

export const sampleWithFullData: IBlockchainAnalytics = {
  id: 26434,
  transactionCount: 24178,
  averageTransactionFee: 29719.36,
  hashrateDistribution: "d'avec sursauter",
  timestamp: dayjs('2023-11-09T13:55'),
  difficulty: 18767.07,
  networkHashrate: 30207.72,
};

export const sampleWithNewData: NewBlockchainAnalytics = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
