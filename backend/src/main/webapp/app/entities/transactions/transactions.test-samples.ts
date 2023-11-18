import dayjs from 'dayjs/esm';

import { ITransactions, NewTransactions } from './transactions.model';

export const sampleWithRequiredData: ITransactions = {
  id: 5850,
};

export const sampleWithPartialData: ITransactions = {
  id: 20217,
  transactionDate: dayjs('2023-11-09T16:43'),
  recipientAddress: 'pour que en dehors de',
};

export const sampleWithFullData: ITransactions = {
  id: 24211,
  amount: 26453.34,
  transactionDate: dayjs('2023-11-09T12:31'),
  senderAddress: 'simplifier',
  recipientAddress: 'trop',
};

export const sampleWithNewData: NewTransactions = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
