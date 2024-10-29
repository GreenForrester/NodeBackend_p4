import { User } from '../../ca_domain/entities/user';
import { IUserRepository } from '../../ca_domain/interfaces/IUserRepository'
import { UserRepository } from '../../ca_infrastructure/database/repositories/userrepository';
import   bcrypt from 'bcrypt';

export class RegisterUserUseCase 
{
    private  userRepository:IUserRepository;
    constructor() {this.userRepository = new UserRepository();}

    async execute(user: User): Promise<User|null> 
    {

        //Salt 10 below is balance between security and performance
        const hashedPassword = await bcrypt.hash(user.password, 10); // Hash the password before storing in db
        user.password = hashedPassword;
        return await this.userRepository.create(user);
    }
}