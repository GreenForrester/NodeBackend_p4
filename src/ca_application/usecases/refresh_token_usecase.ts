import redis from '../../ca_infrastructure/database/redis/redis';
import jwt from 'jsonwebtoken';
import { User } from '../../ca_domain/entities/user';
//import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import { ExtendedError } from '../../ca_presentation/middleware/errorhandling/extendederror';
import { HttpStatusCode } from '../../ca_presentation/middleware/errorhandling/httpstatuscodes';
import { HttpStatusMessages } from '../../ca_presentation/middleware/errorhandling/httpstatusmessages';
import { ErrorTypes } from '../../ca_presentation/middleware/errorhandling/errortypes';

dotenv.config();

interface DecodedToken 
{
    _id: string;
    token: string;
}
const ONE_HOUR = 3600; // seconds

export class RefreshTokenUsecase
{
  public async execute(refreshToken:string): Promise<{ token: string }|null> 
  {

    try{

        const decoded = jwt.verify(refreshToken, process.env.SECRET_KEY as string) as DecodedToken;
        const userString = await redis.get(`user:${decoded._id}`);
        const user = userString ? JSON.parse(userString) as User : null;

        if(user)
        {
            const token = jwt.sign({ _id: decoded._id}, process.env.SECRET_KEY as string, { expiresIn: ONE_HOUR });
            return { token: token};
        }
        else
        {
            return null; //handled in controller
        }
      }
    catch(error)
      {
        const err = new ExtendedError(
            HttpStatusCode.INTERNAL_SERVER_ERROR,
            HttpStatusMessages[HttpStatusCode.INTERNAL_SERVER_ERROR],
            ErrorTypes.SYSTEM,
            error as Error);
            err.name = 'Refresh_token_usecase.execute';
            throw err;
      }   
      
      return null;
  }
  
}