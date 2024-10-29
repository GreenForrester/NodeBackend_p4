import { Product } from '../entities/product';

export interface IProductRepository {
  findAll(): Promise<Product[] | null>;
  findById(productCode: string): Promise<Product | null>;
  findByName(name: string): Promise<Product[] | null>;
  create(product: Product): Promise<Product | null>;
  update(productCode: string, product: Product): Promise<Product | null>;
  delete(productCode: string): Promise<Product | null>;
}