import { Customer } from '../../ca_domain/entities/customer';
import { ICustomerRepository } from '../../ca_domain/interfaces/ICustomerRepository'
import { RepositoryFactory } from '../../ca_infrastructure/database/repositories/repositoryfactory';

export class DeleteCustomerUseCase {
    
    private  customerRepository:ICustomerRepository;
    constructor() {this.customerRepository = RepositoryFactory.getCustomerRepository();}

    async execute(id: string): Promise<Customer|null> {
        return await this.customerRepository.delete(id);
    }
}
