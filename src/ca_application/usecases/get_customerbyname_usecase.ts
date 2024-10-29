import { Customer } from '../../ca_domain/entities/customer';
import { ICustomerRepository } from '../../ca_domain/interfaces/ICustomerRepository'
import { CustomerRepository } from '../../ca_infrastructure/database/repositories/customerrepository';

export class GetCustomerByNameUseCase {
    private customerRepository: ICustomerRepository;  
    constructor() {this.customerRepository = new CustomerRepository();}

    async execute(name: string): Promise<Customer[]|null> {
        return await this.customerRepository.findByName(name);
    }
}
