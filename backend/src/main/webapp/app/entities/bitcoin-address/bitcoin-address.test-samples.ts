import { IBitcoinAddress, NewBitcoinAddress } from './bitcoin-address.model';

export const sampleWithRequiredData: IBitcoinAddress = {
  id: 24851,
};

export const sampleWithPartialData: IBitcoinAddress = {
  id: 3445,
  address: 'reconnaître au cas où',
  balance: 1226.94,
  received: 1695.97,
};

export const sampleWithFullData: IBitcoinAddress = {
  id: 21378,
  address: 'aventurer calme parce que',
  balance: 22834.37,
  label: 'en dépit de entre-temps',
  sent: 15169.15,
  received: 24304.69,
};

export const sampleWithNewData: NewBitcoinAddress = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
