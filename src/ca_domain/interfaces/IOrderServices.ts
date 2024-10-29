import { Order } from "../../ca_domain/entities/order";
import { Customer } from "../../ca_domain/entities/customer";


export interface IOrderService 
{
    getOrderById(id: string): Promise<Order | null>;
    getOrdersByCustomerId(customerId: string): Promise<Customer | null>;
    getAllOrders(): Promise<Order[]|null>
    createOrder(order: Order): Promise<Order | null>;
    updateOrder(id: string, order: Order): Promise<Order | null>;
    deleteOrder(id: string): Promise<Order | null>;
  
}