import { NextFunction, Request, Response} from 'express';
import { HttpStatusCode } from './httpstatuscodes';
import { ExtendedError } from './extendederror';
import logger from '../../../ca_infrastructure/logging/logger'; //loki logger

class ExceptionHandler 
{
  public handleException(error: Error, req: Request, resp: Response, next: NextFunction): void 
  {
    //console.error(error.stack);           // Log the error for debugging
    //console.log(error.constructor.name);

    //Default log values
    let  statusCode:number    = HttpStatusCode.INTERNAL_SERVER_ERROR;
    let  typeoferror:string   = "";
    let  message:string       = 'An unexpected error occurred.';
    let  originmessage:string = "";
    let  stackTrace:string    = "";
  
    //Type guard function
    const isCustomError = (err: Error): err is ExtendedError => { return err instanceof ExtendedError;};  

    //If Extended Error Add Extra information
    if (isCustomError(error)) 
    {
      statusCode    = error.statusCode;
      typeoferror   = error.typeoferror; 
      message       = error.message;
      originmessage = error.originmessage;
      stackTrace    = error.stack||'';     
    } 
    else
    {
      statusCode = HttpStatusCode.INTERNAL_SERVER_ERROR;
      typeoferror= error.name;
      message = error.message;
      stackTrace = error.stack||'';
    }

  // Loki Logging

  logger.error(error.message, 
    { 
      timestamp: new Date().toUTCString(), // Include timestamp
      typeoferror: typeoferror,           // Include type of error
      message: message,                    // Include error message
      originmessage: originmessage,       // Include origin message
      statusCode: statusCode,             // Include status code
      stackTrace: stackTrace,      
    });
    
    // Express Response
    resp.status(statusCode).json({ message: message });
    //next(); //pass to next middleware in app.ts chain
  }
}

export const exceptionHandler = new ExceptionHandler().handleException;