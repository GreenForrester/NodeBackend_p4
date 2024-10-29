import { User } from '../../ca_domain/entities/user';
import { IUserRepository } from '../../ca_domain/interfaces/IUserRepository'
import { UserRepository } from '../../ca_infrastructure/database/repositories/userrepository';

export class UpdateUserUseCase {
    
    private  userRepository:IUserRepository;

    constructor() {this.userRepository = new UserRepository();}

    async execute(id: string, user: User): Promise<User|null> {
       return  await this.userRepository.update(id,user);
    }
}