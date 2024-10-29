import { Customer } from '../entities/customer';

export interface ICustomerRepository {

  findAll(): Promise<Customer[] | null>;
  findById(customerCode: string): Promise<Customer | null>;
  findByName(customerCode: string): Promise<Customer[] | null>;
  create(customer: Customer): Promise<Customer | null>;
  update(customerCode: string, customer: Customer): Promise<Customer | null>;
  delete(customerCode: string): Promise<Customer| null>;
  findByIdWithOrders(customerCode: string): Promise<Customer | null>;
  
}
