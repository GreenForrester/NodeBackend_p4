import { Customer } from '../../ca_domain/entities/customer';
import { ICustomerRepository } from '../../ca_domain/interfaces/ICustomerRepository'
import { CustomerRepository } from '../../ca_infrastructure/database/repositories/customerrepository';

export class UpdateCustomerUseCase {
    private customerRepository: ICustomerRepository;  
    constructor() {this.customerRepository = new CustomerRepository();}

    async execute(id: string, customer: Customer): Promise<Customer|null> {
        return await this.customerRepository.update(id, customer);
    }
}
