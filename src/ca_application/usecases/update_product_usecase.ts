import { Product } from '../../ca_domain/entities/product';
import { IProductRepository } from '../../ca_domain/interfaces/IProductRepository'
import { ProductRepository } from '../../ca_infrastructure/database/repositories/productrepository';

export class UpdateProductUseCase {
    
    private  productRepository:IProductRepository;

    constructor() {this.productRepository = new ProductRepository();}

    async execute(id: string, product: Product): Promise<Product|null> {
       return  await this.productRepository.update(id,product);
    }
}