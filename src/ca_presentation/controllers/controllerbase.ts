import { HttpStatusCode } from '../middleware/errorhandling/httpstatuscodes';
import { HttpStatusMessages } from '../middleware/errorhandling/httpstatusmessages';
import { ExtendedError } from '../middleware/errorhandling/extendederror';
import { ErrorTypes } from '../middleware/errorhandling/errortypes';


export class ControllerBase
{

    // Reusable exception handler
    protected handleError(error: Error, const_name:string ):ExtendedError
    {
      //Throw exception again 
      if (error instanceof ExtendedError) {
        return error;
      }
        const err = new ExtendedError(
          HttpStatusCode.INTERNAL_SERVER_ERROR,
          HttpStatusMessages[HttpStatusCode.INTERNAL_SERVER_ERROR],
          ErrorTypes.APPLICATION,
          error);
          err.name = const_name;
          return err;
        
    }
  
  }