import dayjs from 'dayjs/esm';

import { INetworkSecurity, NewNetworkSecurity } from './network-security.model';

export const sampleWithRequiredData: INetworkSecurity = {
  id: 15316,
};

export const sampleWithPartialData: INetworkSecurity = {
  id: 19189,
  timestamp: dayjs('2023-11-10T02:01'),
  resolution: 'de diablement',
};

export const sampleWithFullData: INetworkSecurity = {
  id: 12909,
  alertType: 'bè',
  description: 'confier pendant que voter',
  timestamp: dayjs('2023-11-10T06:22'),
  severity: 'rose suivant',
  resolution: 'commissionnaire faire',
};

export const sampleWithNewData: NewNetworkSecurity = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
