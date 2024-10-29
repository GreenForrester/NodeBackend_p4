import { Order } from '../entities/order';

export interface IOrderRepository {
  findAll(): Promise<Order[] | null>;
  findById(orderCode: string): Promise<Order | null>;
  create(order: Order): Promise<Order | null>;
  update(orderCode: string, order: Order): Promise<Order | null>;
  delete(orderCode: string): Promise<Order| null>;
  findByCustomerId(customerCode: string): Promise<Order[] | null>; 
}
