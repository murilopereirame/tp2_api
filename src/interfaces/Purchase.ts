import { Client } from "./Client";
import { PurchasepProducts } from "./PurchaseProducts";

export interface Purchase {
  products: PurchasepProducts[];
  client: Client;
}
