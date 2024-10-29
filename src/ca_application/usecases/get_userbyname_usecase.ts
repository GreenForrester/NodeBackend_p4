import { User } from '../../ca_domain/entities/user';
import { IUserRepository } from '../../ca_domain/interfaces/IUserRepository'
import { UserRepository } from '../../ca_infrastructure/database/repositories/userrepository';

export class GetUserByNameUseCase 
{
    
    private  userRepository:IUserRepository;

    constructor() {this.userRepository = new UserRepository();}

    async execute(name: string): Promise<User | null> 
    {
        console.log("getUserByName called  from Usecase");
        return await this.userRepository.findByUsername(name);
    }
    
}