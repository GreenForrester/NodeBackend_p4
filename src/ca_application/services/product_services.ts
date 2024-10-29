import { Product }                  from '../../ca_domain/entities/product';
import { IProductService }          from '../../ca_domain/interfaces/IProductServices';
import { GetProductByIdUseCase }    from '../usecases/get_productbyid_usecase';
import { GetProductByNameUseCase }  from '../usecases/get_productbyname_usecase';
import { GetAllProductsUsecase }    from '../usecases/get_all_products_usecase';
import { CreateProductUseCase }     from '../usecases/create_product_usecase';
import { UpdateProductUseCase }     from '../usecases/update_product_usecase';
import { DeleteProductUseCase }     from '../usecases/delete_product_usecase';

export class ProductService implements IProductService
{
    private getProductByIdUseCase:      GetProductByIdUseCase;
    private getProductByNameUseCase:    GetProductByNameUseCase;
    private createProductUseCase:       CreateProductUseCase;
    private updateProductUseCase:       UpdateProductUseCase;
    private deleteProductUseCase:       DeleteProductUseCase;
    private getAllProductsUsecase:      GetAllProductsUsecase;

    constructor()
    {
        this.getProductByIdUseCase      = new GetProductByIdUseCase();
        this.getProductByNameUseCase    = new GetProductByNameUseCase();
        this.createProductUseCase       = new CreateProductUseCase();
        this.updateProductUseCase       = new UpdateProductUseCase();
        this.deleteProductUseCase       = new DeleteProductUseCase();
        this.getAllProductsUsecase      = new GetAllProductsUsecase();
    }

    async getProductById(id: string): Promise<Product|null> {
        return await this.getProductByIdUseCase.execute(id);
    }

    async getProductByName(name: string): Promise<Product[]|null> {
        return await this.getProductByNameUseCase.execute(name);
    }

    async createProduct(product: Product): Promise<Product|null> {
        return await this.createProductUseCase.execute(product);
    }

    async updateProduct(id: string, product: Product): Promise<Product|null> {
        return await this.updateProductUseCase.execute(id, product);
    }

    async deleteProduct(id: string): Promise<Product|null> {
        return await this.deleteProductUseCase.execute(id);
    }

    async getAllProducts(): Promise<Product[]|null> {
        return await this.getAllProductsUsecase.execute();
    }
}
