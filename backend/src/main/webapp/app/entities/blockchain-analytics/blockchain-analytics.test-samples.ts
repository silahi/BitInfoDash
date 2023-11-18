import dayjs from 'dayjs/esm';

import { IBlockchainAnalytics, NewBlockchainAnalytics } from './blockchain-analytics.model';

export const sampleWithRequiredData: IBlockchainAnalytics = {
  id: 2913,
};

export const sampleWithPartialData: IBlockchainAnalytics = {
  id: 32394,
  transactionCount: 4895,
  hashrateDistribution: 'ouin oh chut',
  timestamp: dayjs('2023-11-09T11:27'),
  difficulty: 2002.85,
};

export const sampleWithFullData: IBlockchainAnalytics = {
  id: 28700,
  transactionCount: 1136,
  averageTransactionFee: 3643.65,
  hashrateDistribution: 'hors de',
  timestamp: dayjs('2023-11-09T14:50'),
  difficulty: 6368.01,
  networkHashrate: 28759.79,
};

export const sampleWithNewData: NewBlockchainAnalytics = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
