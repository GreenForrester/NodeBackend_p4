import { User } from '../entities/user';

export interface IUserRepository 
{

  findAll(): Promise<User[] | null>;
  findById(userId: string): Promise<User | null>;
  findByUsername(username: string): Promise<User | null>; 
  findByEmail(email: string): Promise<User | null>;
  create(user: User): Promise<User | null>;
  update(userId: string, user: User): Promise<User | null>;
  delete(userId: string): Promise<User | null>;
}
