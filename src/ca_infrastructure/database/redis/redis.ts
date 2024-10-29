import Redis, { RedisOptions } from 'ioredis';
import dotenv from 'dotenv';

dotenv.config();

const redisOptions: RedisOptions = {
  host: process.env.REDIS_HOST, // Default to localhost
  port: parseInt(process.env.REDIS_PORT || '6379', 10), // Default to 6379, base-10

};

class RedisClient 
{
  private client: Redis;

  constructor() 
  {
    this.client = new Redis(redisOptions);

    this.client.on('connect', () => { console.log('Connected to Redis') });

    this.client.on('error', (err) => {
      console.error('Redis error:', err);
    });
  }

  public getClient(): Redis {
    return this.client;
  }
}

export default new RedisClient().getClient();
