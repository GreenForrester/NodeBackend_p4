import { Customer } from '../../ca_domain/entities/customer';
import { ICustomerRepository } from '../../ca_domain/interfaces/ICustomerRepository'
import { RepositoryFactory } from '../../ca_infrastructure/database/repositories/repositoryfactory';
import { CustomerValidator } from '../validation/customervalidator';

export class CreateCustomerUseCase 
{  
    private  customerRepository:ICustomerRepository;
    private  customerValidator: CustomerValidator;

    constructor() 
    {
        this.customerRepository = RepositoryFactory.getCustomerRepository();
        this.customerValidator = new CustomerValidator();
    }

    async execute(customer: Customer): Promise<Customer|null> 
    {
        this.customerValidator.validate(customer);
        return await this.customerRepository.create(customer);
    }
}