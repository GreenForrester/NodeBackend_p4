import { User } from '../../ca_domain/entities/user';
import { UserRepository } from '../../ca_infrastructure/database/repositories/userrepository';
import { IUserRepository } from '../../ca_domain/interfaces/IUserRepository'

export class GetAllUserUsecase {
    private UserRepository: IUserRepository;  
    constructor() {this.UserRepository = new UserRepository();}

    async execute(): Promise<User[]|null> {
        return await this.UserRepository.findAll();
    }
}