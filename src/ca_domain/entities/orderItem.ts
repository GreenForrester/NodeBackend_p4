import { Order } from "./order";
import { Product } from "./product";



export class OrderItem {
    constructor(
      
      public orderitemId: string,
      public quantity: number,
      public status: string,

      // Relations (populated if needed), may or may not have associated object ?
      public orderId: string,
      public productId: string,
      public order?: Order,
      public product?: Product 
    ) {}
  }