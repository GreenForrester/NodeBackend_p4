import { User } from '../../../ca_domain/entities/user';
import { PrismaClientFactory } from './prismaclientfactory';
import { IUserRepository } from '../../../ca_domain/interfaces/IUserRepository';
import { BaseRepository } from './baseprepository';

const db = PrismaClientFactory.getMongoDbClient();

export class UserRepository extends BaseRepository implements IUserRepository {
  async findAll(): Promise<User[] | null> {
    try {
      const users = await db.user.findMany();
      return users.map((user) => ({
        ...user,
        createdAt: new Date(user.createdAt),
        updatedAt: new Date(user.updatedAt),
      })) ?? null;
    } 
    catch (error) 
    {
      this.handleError(error as Error, 'UserRepository.findAll');
      return null;
    }
  }

  async findById(userId: string): Promise<User | null> {
    console.log(userId+' in UserRepository.findById');
    try {
      const user = await db.user.findUnique({ where: { userId } });
      return user
        ? {
            ...user,
            createdAt: new Date(user.createdAt),
            updatedAt: new Date(user.updatedAt),
          }
        : null;
    } 
    catch (error) 
    {
      throw this.handleError(error as Error, this.constructor.name);
    }
  }

  
  async findByUsername(username: string): Promise<User | null> {
    console.log(username+' in UserRepository.findByUsername');
    try {
      const user = await db.user.findUnique({ where: { username: username } });
      return user
        ? {
            ...user,
            createdAt: new Date(user.createdAt),
            updatedAt: new Date(user.updatedAt),
          }
        : null;
    } 
    catch (error) 
    {
      throw this.handleError(error as Error, this.constructor.name);
    }
  }

  async findByEmail(email: string): Promise<User | null>
  {
    try {
      const user = await db.user.findUnique({ where: { email } });
      return user
        ? {
            ...user,
            createdAt: new Date(user.createdAt),
            updatedAt: new Date(user.updatedAt),
          }
        : null;
    } 
    catch (error) 
    {
      throw this.handleError(error as Error, this.constructor.name);
    }

  }

  async create(user: User): Promise<User | null> {
    try {
      const newUser = await db.user.create({
        data: {
          ...user,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      });

      return {
        ...newUser,
        createdAt: new Date(newUser.createdAt),
        updatedAt: new Date(newUser.updatedAt),
      };
    } catch (error) 
    {
      throw this.handleError(error as Error, this.constructor.name);
    }
  }

  async update(userId: string, user: User): Promise<User | null> {
    try {
      const updatedUser = await db.user.update({
        where: { userId },
        data: {
          ...user,
          updatedAt: new Date(),
        },
      });

      return updatedUser
        ? {
            ...updatedUser,
            createdAt: new Date(updatedUser.createdAt),
            updatedAt: new Date(updatedUser.updatedAt),
          }
        : null;
    } catch (error) 
    {
      throw this.handleError(error as Error, this.constructor.name);
    }
  }

  async delete(userId: string): Promise<User | null> {
    try {
      return await db.user.delete({
        where: { userId },
      });
    } catch (error) 
    {
      throw this.handleError(error as Error, this.constructor.name);
    }
  }
}

