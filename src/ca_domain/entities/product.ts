import { OrderItem } from "./orderItem";
    

export class Product {
    constructor(
      public productCode: string,
      public productName: string,
      public productvendor: string,
      public productDescription: string,
      public quantityInStock: number,
      public buyPrice: number,
      public msrp: number,
      public creationDate: Date,
      public modificationDate: Date,
      // Relations (populated if needed)
      public orderItems?: OrderItem[] 
    ) {}
  }