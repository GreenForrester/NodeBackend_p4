import { Product } from '../../ca_domain/entities/product';
import { IProductRepository } from '../../ca_domain/interfaces/IProductRepository'
import { ProductRepository } from '../../ca_infrastructure/database/repositories/productrepository';

export class GetProductByNameUseCase 
{
    
    private  productRepository:IProductRepository;

    constructor() {this.productRepository = new ProductRepository();}

    async execute(name: string): Promise<Product[] | null> {
        return await this.productRepository.findByName(name);
    }
}