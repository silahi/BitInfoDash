import dayjs from 'dayjs/esm';

import { INetworkSecurity, NewNetworkSecurity } from './network-security.model';

export const sampleWithRequiredData: INetworkSecurity = {
  id: 29758,
};

export const sampleWithPartialData: INetworkSecurity = {
  id: 9240,
  alertType: 'snif ranger commis',
  description: "spécialiste à l'instar de",
  severity: 'commis de cuisine pourpre',
};

export const sampleWithFullData: INetworkSecurity = {
  id: 25367,
  alertType: 'triangulaire',
  description: 'patientèle dedans gai',
  timestamp: dayjs('2023-11-09T07:28'),
  severity: 'cot cot dès tôt',
  resolution: 'restituer',
};

export const sampleWithNewData: NewNetworkSecurity = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
