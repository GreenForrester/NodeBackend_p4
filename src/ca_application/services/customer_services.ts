import { Customer }                 from '../../ca_domain/entities/customer';
import { ICustomerService }         from '../../ca_domain/interfaces/ICustomerServices';
import { GetCustomerByIdUseCase }   from '../usecases/get_customerbyid_usecase';
import { GetCustomerByNameUseCase } from '../usecases/get_customerbyname_usecase';
import { CreateCustomerUseCase }    from '../usecases/create_customer_usecase';
import { UpdateCustomerUseCase }    from '../usecases/update_customer_usercase';
import { DeleteCustomerUseCase }    from '../usecases/delete_customer_usecase';
import { GetAllCustomersUsecase }   from '../usecases/get_all_customers_usecase';

export class CustomerService implements ICustomerService
{
    private getCustomerByIdUseCase:     GetCustomerByIdUseCase;
    private getCustomerByNameUseCase:   GetCustomerByNameUseCase;
    private getAllCustomersUseCase:     GetAllCustomersUsecase;
    private createCustomerUseCase:      CreateCustomerUseCase;
    private updateCustomerUseCase:      UpdateCustomerUseCase;
    private deleteCustomerUseCase:      DeleteCustomerUseCase;

    constructor() 
    {
        this.getCustomerByIdUseCase     =    new  GetCustomerByIdUseCase();
        this.getCustomerByNameUseCase   =    new  GetCustomerByNameUseCase();
        this.createCustomerUseCase      =    new  CreateCustomerUseCase();
        this.updateCustomerUseCase      =    new  UpdateCustomerUseCase();
        this.deleteCustomerUseCase      =    new  DeleteCustomerUseCase();
        this.getAllCustomersUseCase     =    new  GetAllCustomersUsecase();
    }

    async getCustomerById(id: string): Promise<Customer|null> {
        return await this.getCustomerByIdUseCase.execute(id);
    }

    async getCustomerByName(name: string): Promise<Customer[]|null> {
        return await this.getCustomerByNameUseCase.execute(name);
    }

    async getAllCustomers(): Promise<Customer[]|null> {
        return await this.getAllCustomersUseCase.execute();
    }

    async createCustomer(customer: Customer): Promise<Customer|null> {
        return await this.createCustomerUseCase.execute(customer);
    }

    async updateCustomer(id: string, customer: Customer): Promise<Customer|null> {
        return await this.updateCustomerUseCase.execute(id, customer );
    }

    async deleteCustomer(id: string): Promise<Customer|null> {
        return await this.deleteCustomerUseCase.execute(id);
    }
}