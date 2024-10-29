 //You're automatically creating public properties for the class with the same name as the constructor parameters.

import { Customer } from "./customer";  
import { OrderItem } from "./orderItem"; 



 // src/domain/entities/Order.ts

 
export class Order {
    constructor(
      public orderId: string,
      public orderDate: Date,
      public shippingDate: Date | null, // or nullvalue
      public status: string,
      public comments: string,
      public total: number,
      public paid: boolean,
      // Relation
      public customerId: string,
      public customer?: Customer | null,
      public orderItems?: OrderItem[] 
    ) {}
  }