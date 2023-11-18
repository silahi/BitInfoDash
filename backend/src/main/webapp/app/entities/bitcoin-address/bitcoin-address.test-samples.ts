import { IBitcoinAddress, NewBitcoinAddress } from './bitcoin-address.model';

export const sampleWithRequiredData: IBitcoinAddress = {
  id: 18423,
};

export const sampleWithPartialData: IBitcoinAddress = {
  id: 10136,
  address: 'boum plic',
  balance: 12685.5,
  sent: 21608.97,
};

export const sampleWithFullData: IBitcoinAddress = {
  id: 19961,
  address: 'succéder',
  balance: 23407.43,
  label: 'adversaire incliner',
  sent: 15789.48,
  received: 15879.85,
};

export const sampleWithNewData: NewBitcoinAddress = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
