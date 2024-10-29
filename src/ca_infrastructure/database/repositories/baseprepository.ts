import { HttpStatusCode } from '../../../ca_presentation/middleware/errorhandling/httpstatuscodes';
import { HttpStatusMessages } from '../../../ca_presentation/middleware/errorhandling/httpstatusmessages';
import { ExtendedError } from '../../../ca_presentation/middleware/errorhandling/extendederror';
import { ErrorTypes } from '../../../ca_presentation/middleware/errorhandling/errortypes';

export class BaseRepository 
{

    // Reusable exception handler
    protected handleError(error: Error, const_name:string):ExtendedError
    {
      //change like controller
        const err = new ExtendedError(
          HttpStatusCode.INTERNAL_SERVER_ERROR,
          HttpStatusMessages[HttpStatusCode.INTERNAL_SERVER_ERROR],
          ErrorTypes.SYSTEM,
          error);

          err.name = const_name;

        throw err;
    }
  
  }
