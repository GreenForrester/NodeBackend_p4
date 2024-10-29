// domain/services/ICustomerService.ts
import { Customer } from '../../ca_domain/entities/customer';

export interface ICustomerService 
{
    getCustomerById(id: string): Promise<Customer|null>;
    getCustomerByName(name: string): Promise<Customer[]|null>; // Updated method
    createCustomer(customer: Customer): Promise<Customer|null>;
    updateCustomer(id: string, customer: Customer): Promise<Customer|null>;
    deleteCustomer(id: string): Promise<Customer|null>;
    getAllCustomers(): Promise<Customer[]|null>;  
}
