import dayjs from 'dayjs/esm';
import { IBitcoinAddress } from 'app/entities/bitcoin-address/bitcoin-address.model';

export interface ITransactions {
  id: number;
  amount?: number | null;
  transactionDate?: dayjs.Dayjs | null;
  senderAddress?: string | null;
  recipientAddress?: string | null;
  bitcoinAddress?: Pick<IBitcoinAddress, 'id'> | null;
}

export type NewTransactions = Omit<ITransactions, 'id'> & { id: null };
