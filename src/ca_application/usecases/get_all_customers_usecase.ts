import { Customer } from '../../ca_domain/entities/customer';
import { ICustomerRepository } from '../../ca_domain/interfaces/ICustomerRepository'
import { RepositoryFactory } from '../../ca_infrastructure/database/repositories/repositoryfactory';

export class GetAllCustomersUsecase {
    private customerRepository: ICustomerRepository;  
    constructor() {this.customerRepository = RepositoryFactory.getCustomerRepository();}

    async execute(): Promise<Customer[]|null> {
        return await this.customerRepository.findAll();
    }
}
