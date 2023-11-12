import dayjs from 'dayjs/esm';

import { ITransactions, NewTransactions } from './transactions.model';

export const sampleWithRequiredData: ITransactions = {
  id: 3327,
};

export const sampleWithPartialData: ITransactions = {
  id: 7847,
  amount: 18076.03,
  transactionDate: dayjs('2023-11-09T10:38'),
};

export const sampleWithFullData: ITransactions = {
  id: 1226,
  amount: 27322.67,
  transactionDate: dayjs('2023-11-09T16:21'),
  senderAddress: 'ha ha',
  recipientAddress: 'redire hors naguère',
};

export const sampleWithNewData: NewTransactions = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
