import { Customer } from '../../../ca_domain/entities/customer';
import { PrismaClientFactory } from './prismaclientfactory';
import { ICustomerRepository } from '../../../ca_domain/interfaces/ICustomerRepository';
import { BaseRepository } from './baseprepository';

const db = PrismaClientFactory.getMongoDbClient();

export class CustomerRepository extends BaseRepository implements ICustomerRepository
{

  async findAll(): Promise<Customer[] | null> 
  {

    
    try
    {
      const customers = await db.customer.findMany();

        return customers.map((customer) => ({
          ...customer,
          creationDate: new Date(customer.creationDate),
          modificationDate: new Date(customer.modificationDate),
        })) ?? null; //simplied null check ?? avoid if-else
  
    }
    catch(error)
    {
      throw this.handleError(error as Error, 'CustomerRepository.findAll');
    }
  }

  async findById(customerCode: string): Promise<Customer | null> 
  {
    try
    {
      const customer = await db.customer.findUnique({ where: { customerCode }});
      return customer ? {
        ...customer,
        creationDate: new Date(customer.creationDate),
        modificationDate: new Date(customer.modificationDate),
      } : null;
    }
    catch(error)
    {
     
      throw this.handleError(error as Error, 'CustomerRepository.findAll');
    }
  }

  async findByName(customerName: string): Promise<Customer[] | null> 
  {
    
    try{
      const customer = await db.customer.findMany( {where: { customerName },});
      return customer?.map((customer) => ({
        ...customer,
        creationDate: new Date(customer.creationDate),
        modificationDate: new Date(customer.modificationDate),
      })) ?? null;
    }
    catch(error)
    {
      throw this.handleError(error as Error, 'CustomerRepository.findAll');
    }
    
  }

  async create(customer: Customer): Promise<Customer | null> {
    try{
        const newCustomer = await db.customer.create({
          data: {
            ...customer,
            creationDate: new Date(),
            modificationDate: new Date(),
            orders: { connect: [] }, //empty order list at time of customer creation
          }, 
        });

        return {
          ...newCustomer,
          creationDate: new Date(newCustomer.creationDate),
          modificationDate: new Date(newCustomer.modificationDate),
        };
    } catch(error)
    {
      throw this.handleError(error as Error, 'CustomerRepository.findAll');
    }
  }

  //Just updating customer
  async update(customerCode: string, customer: Customer): Promise<Customer | null> 
  {
    try
    {
    
    const updatedCustomer = await db.customer.update({
      where: { customerCode },
      data: {
        ...customer,
        modificationDate: new Date(),
        //Keep relation intact
        orders: customer.orders ? { connect: customer.orders.map((order) => ({ orderId: order.orderId })) } : undefined,
          },
      });

      return updatedCustomer ? {
        ...updatedCustomer,
        creationDate: new Date(updatedCustomer.creationDate),
        modificationDate: new Date(updatedCustomer.modificationDate),
      } : null;
    }
    catch(error)
    {
      throw this.handleError(error as Error, 'CustomerRepository.findAll');
    }
  }

  async delete(customerCode: string): Promise<Customer | null> 
  {
    try
    {
      return await db.customer.delete({ where: { customerCode },});
    }
    catch(error)
    {
      throw this.handleError(error as Error, 'CustomerRepository.findAll');
    }
  }
  
  async findByIdWithOrders(customerCode: string): Promise<Customer | null> 
  {
    try 
    {
      const customer = await db.customer.findUnique({
        where: { customerCode },
        include: { orders: true },
      });

      return customer;
    } 
    catch (error) 
    {
      throw this.handleError(error as Error, 'CustomerRepository.findAll');
    }
  }
}