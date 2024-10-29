import { Product } from '../../ca_domain/entities/product';
import { ProductRepository } from '../../ca_infrastructure/database/repositories/productrepository';
import { IProductRepository } from '../../ca_domain/interfaces/IProductRepository'

export class GetAllProductsUsecase {
    private ProductRepository: IProductRepository;  
    constructor() {this.ProductRepository = new ProductRepository();}

    async execute(): Promise<Product[]|null> {
        return await this.ProductRepository.findAll();
    }
}