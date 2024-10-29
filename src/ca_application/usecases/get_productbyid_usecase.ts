import { Product } from '../../ca_domain/entities/product';
import { IProductRepository } from '../../ca_domain/interfaces/IProductRepository';
import { ProductRepository } from '../../ca_infrastructure/database/repositories/productrepository';

export class GetProductByIdUseCase {
    
    private  productRepository:IProductRepository;
    constructor() {this.productRepository = new ProductRepository();}

    async execute(id: string): Promise<Product|null> {
        return await this.productRepository.findById(id);
    }
}