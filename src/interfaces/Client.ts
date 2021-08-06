import { Address } from "./Address";

export interface Client {
  cpf: string;
  name: string;
  phone: string;
  address: Address;
}
