// src/presentation/controllers/UserController.ts
import { Request, Response } from 'express';
import { ProductService } from '../../ca_application/services/product_services';
import { HttpStatusCode } from '../middleware/errorhandling/httpstatuscodes';
import { HttpStatusMessages} from '../middleware/errorhandling/httpstatusmessages';
import { ControllerBase } from './controllerbase';

export class ProductController extends ControllerBase {

  private productServices: ProductService;

  constructor() 
  {
    super();
    this.productServices = new ProductService(); 
  }
  
  async getAllProduct(req: Request, res: Response) 
  {
    try 
    {
      const product = await this.productServices.getAllProducts();
      res.status(HttpStatusCode.OK).json(product);
    } 
    catch (error) 
    {
      throw this.handleError(error as Error, this.constructor.name);
    }
  }

  async getProductById(req: Request, res: Response) 
  {
    try 
    {
      const product = await this.productServices.getProductById(req.params.id);
      res.status(HttpStatusCode.OK).json(product);
    } 
    catch (error) 
    {
      throw this.handleError(error as Error, this.constructor.name);
    }
  }

  async getProductByName(req: Request, res: Response) 
  {
    try 
    {
      const product = await this.productServices.getProductByName(req.params.name);
      res.status(HttpStatusCode.OK).json(product);
    } 
    catch (error) 
    {
      throw this.handleError(error as Error, this.constructor.name);
    }
  }

  async createProduct(req: Request, res: Response) 
  {
    try 
    {
      const product = await this.productServices.createProduct(req.body);
      res.status(HttpStatusCode.CREATED).json(product);
    } 
    catch (error) 
    {
      throw this.handleError(error as Error, this.constructor.name);
    }
  }

  async updateProduct(req: Request, res: Response) 
  {
    try 
    {
      const product = await this.productServices.updateProduct(req.params.id, req.body);
      res.status(HttpStatusCode.OK).json(product);
    } 
    catch (error) 
    {
      throw this.handleError(error as Error, this.constructor.name);
    }
  }

  async deleteProduct(req: Request, res: Response) 
  {
    try 
    {
      await this.productServices.deleteProduct(req.params.id);
      res.status(HttpStatusCode.DELETED).json(HttpStatusMessages[HttpStatusCode.DELETED]);
    } 
    catch (error) 
    {
      throw this.handleError(error as Error, this.constructor.name);
    }
  }
}
