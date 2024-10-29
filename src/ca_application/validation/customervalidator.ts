import { Customer } from '../../ca_domain/entities/customer';
import { ErrorTypes } from '../../ca_presentation/middleware/errorhandling/errortypes';
import { ExtendedError } from '../../ca_presentation/middleware/errorhandling/extendederror';
import { HttpStatusCode } from '../../ca_presentation/middleware/errorhandling/httpstatuscodes';
import { HttpStatusMessages } from '../../ca_presentation/middleware/errorhandling/httpstatusmessages';
import { CustomerSchema } from './customerschema'; // Assuming the schema is in the same directory

export class CustomerValidator 
{
    validate(customer: Customer): void {
        try 
        {
            CustomerSchema.parse(customer);

        } catch (error) 
        {
            const err = new ExtendedError(
                HttpStatusCode.INTERNAL_SERVER_ERROR,
                HttpStatusMessages[HttpStatusCode.INTERNAL_SERVER_ERROR],
                ErrorTypes.APPLICATION,
                error as Error);
                err.name = "CustomerValidator";
            
            throw err;
        }

        
        // Add other validation checks here if needed
    }
}