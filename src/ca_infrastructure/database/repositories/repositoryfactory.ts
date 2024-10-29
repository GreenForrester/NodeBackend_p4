import { ICustomerRepository } from '../../../ca_domain/interfaces/ICustomerRepository';
import { IOrderRepository }    from '../../../ca_domain/interfaces/IOrderRepository';
import { IProductRepository }  from '../../../ca_domain/interfaces/IProductRepository';
import { CustomerRepository }  from './customerrepository'; 
import { OrderRepository }     from './orderrepository';
import { ProductRepository }   from './productrepository';

export class RepositoryFactory {
    
    // No static instances anymore

    public static getCustomerRepository(): ICustomerRepository {
        return new CustomerRepository(); 
    }

    public static getOrderRepository(): IOrderRepository {
        return new OrderRepository(); 
    }

    public static getProductRepository(): IProductRepository {
        return new ProductRepository(); 
    }
}