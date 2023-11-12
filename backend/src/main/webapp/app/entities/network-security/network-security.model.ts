import dayjs from 'dayjs/esm';

export interface INetworkSecurity {
  id: number;
  alertType?: string | null;
  description?: string | null;
  timestamp?: dayjs.Dayjs | null;
  severity?: string | null;
  resolution?: string | null;
}

export type NewNetworkSecurity = Omit<INetworkSecurity, 'id'> & { id: null };
