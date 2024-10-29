import { Product } from "../../ca_domain/entities/product";

export interface IProductService {

    getProductById(id: string): Promise<Product|null>;
    getProductByName(name: string): Promise<Product[]|null>; // Similar to getCustomerByName
    createProduct(product: Product): Promise<Product|null>;
    updateProduct(id: string, product: Product): Promise<Product|null>;
    deleteProduct(id: string): Promise<Product|null>;
}
