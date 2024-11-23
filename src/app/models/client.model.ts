import { Address } from './address.model';

export interface Client {
  id: number;
  name: string;
  email: string;
  addresses: Address[];
}
