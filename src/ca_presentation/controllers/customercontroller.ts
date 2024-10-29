// src/presentation/controllers/UserController.ts
import { Request, Response } from 'express';
import { CustomerService } from '../../ca_application/services/customer_services';
import { HttpStatusCode } from '../middleware/errorhandling/httpstatuscodes';
import { HttpStatusMessages} from '../middleware/errorhandling/httpstatusmessages';
import { ControllerBase } from './controllerbase';
import logger from '../../ca_infrastructure/logging/logger';


export class CustomerController extends ControllerBase
{

  private customerServices: CustomerService;

  constructor() 
  {
    super(); //base class contains handleerror
    this.customerServices = new CustomerService(); 
  }
  
  async getAllCustomer(req: Request, res: Response) 
  {
    logger.log({level: "info", message: "getAll Customers called"});
    try 
    {
      const customer = await this.customerServices.getAllCustomers();
      res.status(HttpStatusCode.OK).json(customer);
    } 
    catch (error)
    {
     
      throw this.handleError(error as Error, this.constructor.name);
    }
  }

  async getCustomerById(req: Request, res: Response) 
  { 
    try 
    {
      const customer = await this.customerServices.getCustomerById(req.params.id);
      res.status(HttpStatusCode.OK).json(customer);
    } 
    catch (error)
    {
      throw this.handleError(error as Error, this.constructor.name);
    }
  }

  async getCustomerByName(req: Request, res: Response) 
  {
    try 
    {
      const customer = await this.customerServices.getCustomerByName(req.params.name);
      res.status(HttpStatusCode.OK).json(customer);
    } 
    catch (error)
    {
      throw this.handleError(error as Error, this.constructor.name);
    }
  }

  async createCustomer(req: Request, res: Response) 
  {
    try 
    {
      const customer = await this.customerServices.createCustomer(req.body);
      res.status(HttpStatusCode.CREATED).json(customer);
    } 
    catch (error) 
    {
      throw this.handleError(error as Error, this.constructor.name);
    }
  }

  async updateCustomer(req: Request, res: Response) 
  {
    try 
    {
      const customer = await this.customerServices.updateCustomer(req.params.id, req.body);
      res.status(HttpStatusCode.OK).json(customer);
    } 
    catch (error) 
    {     
      throw this.handleError(error as Error, this.constructor.name);
    }
  }

  async deleteCustomer(req: Request, res: Response) 
  {
    try 
    {
      await this.customerServices.deleteCustomer(req.params.id);
      res.status(HttpStatusCode.DELETED).json(HttpStatusMessages[HttpStatusCode.DELETED]);
    } 
    catch (error) 
    {
      throw this.handleError(error as Error, this.constructor.name);
    }
  }
}
