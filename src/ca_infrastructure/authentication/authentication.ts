// src/ca_infrastructure/authentication/passport.config.ts 
import passport                                from 'passport';
import { Strategy as LocalStrategy }           from 'passport-local';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import { User }                                from '../../ca_domain/entities/user';
import { UserRepository }                      from '../database/repositories/userrepository'; 
import redis                                   from '../database/redis/redis';
import dotenv                                  from 'dotenv';
import bcrypt from 'bcrypt';

//Load Environment variables .env
dotenv.config();

export class PassportConfig 
{

  constructor() 
  {
    this.setupLocalStrategy();
    this.setupJwtStrategy();
  }

  private setupLocalStrategy() 
  {
    passport.use(
      new LocalStrategy(
        { usernameField: 'username' },
        async (username, password, done) => {
          try 
          {
            const userRepository = new UserRepository();
            const user:User | null = await userRepository.findByUsername(username);

            if (!user || !(await bcrypt.compare(password, user.password))) {
              return done(null, false, { message: 'Invalid credentials' });
            }

            return done(null, user);
          } 
          catch (error) 
          {
            return error;//To be changed with Wrapped error
          }
        }
      )
    );
  }

  private setupJwtStrategy() 
  {
    passport.use(
      new JwtStrategy(
        {
          jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
          secretOrKey: process.env.SECRET_KEY as string,
        },
        async (jwtPayload, done) => 
        {
          //Reached here it means that token is valid
          try {
                const userId = jwtPayload._id;
                const cachedUser = await redis.get(`user:${userId}`);
      
                //If user is not cached in redis, it means user never logged or logged out
                if (cachedUser) 
                {  
                  return done(null, JSON.parse(cachedUser));
                } 
                else 
                {
                    //Logged out scenario
                    return done(null, false);
                } 
              }
          catch (error) 
          {
              return done(error, false, { message: 'Unauthorized: Please login again or refresh your token.' }); 
          }     
        }
    ));
  }

  public initialize() 
  {
    return passport.initialize(); 
  }
}
