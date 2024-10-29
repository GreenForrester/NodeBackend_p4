import { User } from "../../ca_domain/entities/user";

export interface IUserService {

    getUserById(id: string): Promise<User|null>;
    getUserByUsername(username: string): Promise<User|null>; 
    getAllUsers(): Promise<User[]|null>; 

    updateUser(id: string, user: User): Promise<User|null>;
    deleteUser(id: string): Promise<User|null>;


    register(user: User): Promise<User|null>;                   //registered user or null means failed operation
    login(username: string, password: string): Promise<{ token: string, refreshToken: string }|null>; //string containing token
    logout(userId: string): Promise<boolean>; 
}