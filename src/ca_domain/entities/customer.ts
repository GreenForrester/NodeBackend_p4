
import { Order } from "./order";


export class Customer {
  constructor(
    public customerCode: string,
    public customerName: string,
    public cemail: string,
    public phone: string,
    public address: string,
    public city: string,
    public postalCode: string,
    public country: string,
    public creationDate: Date,
    public modificationDate: Date,
    // Relations (populated if needed)
    public orders?: Order[] 
  ) {}
}