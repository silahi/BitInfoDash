import { IBitcoinAddress, NewBitcoinAddress } from './bitcoin-address.model';

export const sampleWithRequiredData: IBitcoinAddress = {
  id: 28777,
};

export const sampleWithPartialData: IBitcoinAddress = {
  id: 1165,
  label: 'recourir effectuer moderne',
};

export const sampleWithFullData: IBitcoinAddress = {
  id: 6149,
  address: 'avant que hystérique',
  balance: 6997.41,
  label: 'jeune',
};

export const sampleWithNewData: NewBitcoinAddress = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
