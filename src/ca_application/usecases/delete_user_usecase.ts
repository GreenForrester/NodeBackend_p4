import { User } from '../../ca_domain/entities/user';
import { IUserRepository } from '../../ca_domain/interfaces/IUserRepository'
import { UserRepository } from '../../ca_infrastructure/database/repositories/userrepository';

export class DeleteUserUseCase {
    
    private  userRepository:IUserRepository;
    constructor() {this.userRepository = new UserRepository();}

    async execute(id: string): Promise<User|null> {
       return await this.userRepository.delete(id);
    }
}