// src/presentation/controllers/UserController.ts
import { Request, Response } from 'express';
import {UserService} from '../../ca_application/services/user_services';
import { HttpStatusCode } from '../middleware/errorhandling/httpstatuscodes';
import { HttpStatusMessages} from '../middleware/errorhandling/httpstatusmessages';
import { ControllerBase } from './controllerbase';
import logger from '../../ca_infrastructure/logging/logger';


export class UserController extends ControllerBase
{

  private userServices: UserService;

  constructor() 
  {
    super(); //base class contains handleerror
    this.userServices = new UserService(); 
  }
  
  async getAllUsers(req: Request, res: Response) 
  {
    logger.log({level: "info", message: "getAll Customers called"});
    try 
    {
      const user = await this.userServices.getAllUsers();
      res.status(HttpStatusCode.OK).json(user);
    } 
    catch (error)
    {
      console.log("Error Happend in getAllCustomer");
      throw this.handleError(error as Error, this.constructor.name);
    }
  }

  async getUserById(req: Request, res: Response) 
  { 
    try 
    {
      const user = await this.userServices.getUserById(req.params.id);
      res.status(HttpStatusCode.OK).json(user);
    } 
    catch (error)
    {
      throw this.handleError(error as Error, this.constructor.name);
    }
  }

  async getUserByName(req: Request, res: Response) 
  {
    console.log("controller getUserByName called");
    try 
    {
      const user = await this.userServices.getUserByUsername(req.params.name);
      res.status(HttpStatusCode.OK).json(user);
    } 
    catch (error)
    {
      throw this.handleError(error as Error, this.constructor.name);
    }
  }

  async register(req: Request, res: Response) 
  {
    try 
    {
      const user = await this.userServices.register(req.body);
      res.status(HttpStatusCode.CREATED).json(user);
    } 
    catch (error) 
    {
      throw this.handleError(error as Error, this.constructor.name);
    }
  }

  async updateUser(req: Request, res: Response) 
  {
    try 
    {
      const user = await this.userServices.updateUser(req.params.id, req.body);
      res.status(HttpStatusCode.OK).json(user);
    } 
    catch (error) 
    {
      throw this.handleError(error as Error, this.constructor.name);
    }
  }

  async deleteUser(req: Request, res: Response) 
  {
    try 
    {
      await this.userServices.deleteUser(req.params.id);
      res.status(HttpStatusCode.DELETED).json(HttpStatusMessages[HttpStatusCode.DELETED]);
    } 
    catch (error) 
    {
      throw this.handleError(error as Error, this.constructor.name);
    }
  }

  async login(req: Request, res: Response) 
  {
    try 
    {
      const {email, password} = req.body;
      const loginresult = await this.userServices.login(email, password);

      if (loginresult) 
      {
        const { token, refreshToken } = loginresult;
        res.status(HttpStatusCode.OK).json({token:token, refreshToken:refreshToken }); 
      } 
      else 
      {
        res.status(HttpStatusCode.UNAUTHORIZED).json({ message: 'Invalid credentials' });
      }
    } 
    catch (error) 
    {
      throw this.handleError(error as Error, this.constructor.name);
    }
  }

  async logout(req: Request, res: Response) 
  {
    try 
    {
      const result:boolean = await this.userServices.logout(req.params.id);
      if (result)
        res.status(HttpStatusCode.OK).json({ message: 'Logged out' });
    } 
    catch (error) 
    {
      throw this.handleError(error as Error, this.constructor.name);
    }
  }

  async refreshtoken(req: Request, res: Response) 
  {
    try 
    {
      const refreshToken = req.body.refreshToken;
      if (!refreshToken) {
        return res.status(HttpStatusCode.BAD_REQUEST).json({ message: 'Refresh token is required' });
      }
      const result = await this.userServices.refreshtoken(refreshToken);

      if (result) 
      {
        res.status(HttpStatusCode.OK).json(result);
      }
     else //null
     {
      res.status(HttpStatusCode.UNAUTHORIZED).json({ message: 'Invalid refresh token' });
     }
    } 
    catch (error) 
    {
      throw this.handleError(error as Error, this.constructor.name);
    }
  }

}
