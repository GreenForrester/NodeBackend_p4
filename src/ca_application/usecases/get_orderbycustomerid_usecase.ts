import { Customer } from '../../ca_domain/entities/customer';
import { ICustomerRepository } from '../../ca_domain/interfaces/ICustomerRepository'
import { CustomerRepository } from '../../ca_infrastructure/database/repositories/customerrepository';

export class GetOrderByCustomerIdUseCase {
    private customerRepository: ICustomerRepository;  
    constructor() {this.customerRepository = new CustomerRepository();}

    async execute(id: string): Promise<Customer|null> {
        return await this.customerRepository.findByIdWithOrders(id);
    }
}