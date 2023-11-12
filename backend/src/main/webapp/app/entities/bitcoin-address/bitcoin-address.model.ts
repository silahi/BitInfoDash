export interface IBitcoinAddress {
  id: number;
  address?: string | null;
  balance?: number | null;
  label?: string | null;
}

export type NewBitcoinAddress = Omit<IBitcoinAddress, 'id'> & { id: null };
