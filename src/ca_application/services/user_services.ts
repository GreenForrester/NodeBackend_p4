import { User }                     from '../../ca_domain/entities/user';
import { IUserService }             from '../../ca_domain/interfaces/IUserServices';
import { GetUserByIdUseCase }       from '../usecases/get_userbyid_usecase';
import { GetUserByNameUseCase }     from '../usecases/get_userbyname_usecase';
import { RegisterUserUseCase }      from '../usecases/create_register_user_usecase';
import { UpdateUserUseCase }        from '../usecases/update_user_usecase';
import { DeleteUserUseCase }        from '../usecases/delete_user_usecase';
import { GetAllUserUsecase }        from '../usecases/get_all_users_usecase';
import { LoginUsecase }             from '../usecases/login_usecase';
import { LogoutUsecase}             from '../usecases/logout_usecase';
import { RefreshTokenUsecase }      from '../usecases/refresh_token_usecase';


export class UserService implements IUserService
{
    private getUserByIdUseCase:     GetUserByIdUseCase;
    private getUserByNameUseCase:   GetUserByNameUseCase;
    private getAllUsersUseCase:     GetAllUserUsecase;
    private registerUserUseCase:    RegisterUserUseCase;
    private updateUserUseCase:      UpdateUserUseCase;
    private deleteUserUseCase:      DeleteUserUseCase;
    private loginUseCase:           LoginUsecase;
    private logoutUseCase:          LogoutUsecase;
    private refreshTokenUseCase:    RefreshTokenUsecase;


    constructor() 
    {
        this.getUserByIdUseCase     =    new  GetUserByIdUseCase();
        this.getUserByNameUseCase   =    new  GetUserByNameUseCase();
        this.registerUserUseCase    =    new  RegisterUserUseCase();
        this.updateUserUseCase      =    new  UpdateUserUseCase();
        this.deleteUserUseCase      =    new  DeleteUserUseCase();
        this.getAllUsersUseCase     =    new  GetAllUserUsecase();
        this.loginUseCase           =    new  LoginUsecase();
        this.logoutUseCase          =    new  LogoutUsecase();
        this.refreshTokenUseCase    =    new  RefreshTokenUsecase();   
    }


    async getUserById(id: string): Promise<User|null> 
    {
        return await this.getUserByIdUseCase.execute(id);
    }

    async getUserByUsername(name: string): Promise<User|null> 
    {
        console.log("getUserByUsername called");
        return await this.getUserByNameUseCase.execute(name);
    }

    async getAllUsers(): Promise<User[]|null> 
    {
        return await this.getAllUsersUseCase.execute();
    }

    async updateUser(id: string, user: User): Promise<User|null> 
    {
        return await this.updateUserUseCase.execute(id, user );
    }

    async deleteUser(id: string): Promise<User|null> 
    {
        return await this.deleteUserUseCase.execute(id);
    }

    async register(user: User): Promise<User|null>
    {
        console.log("register called");
        return await this.registerUserUseCase.execute(user);
    }       

    async login(email: string, password: string): Promise<{ token: string, refreshToken: string }|null>
    {
        return await this.loginUseCase.execute(email,password);
    }

    async logout(userId: string): Promise<boolean>
    {
        return await this.logoutUseCase.execute(userId);
    }

    async refreshtoken(refreshToken:string): Promise<{ token: string }|null>
    {
        return await this.refreshTokenUseCase.execute(refreshToken);
    }
}