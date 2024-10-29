import redis from '../../ca_infrastructure/database/redis/redis';

export class LogoutUsecase
{
  public async execute(userId:string): Promise<boolean> 
  {
      //Subsequent calls will fail and will require login
      await redis.del(`user:${userId}`);
      return true;
  }
}
