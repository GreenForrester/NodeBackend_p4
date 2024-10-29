import { Product } from '../../../ca_domain/entities/product';
import { PrismaClientFactory } from './prismaclientfactory';
import { IProductRepository } from '../../../ca_domain/interfaces/IProductRepository';
import { BaseRepository } from './baseprepository';

const db = PrismaClientFactory.getMongoDbClient();

export class ProductRepository extends BaseRepository implements IProductRepository 
{
  async findAll(): Promise<Product[] | null>
  {
    try
    {
      const products = await db.product.findMany();
      return products.map((product) => ({
        ...product,
        creationDate: new Date(product.creationDate),
        modificationDate: new Date(product.modificationDate),
      }))??null;
    }
    catch(error)
    {
      throw this.handleError(error as Error, this.constructor.name);
    }
  }

  async findById(productCode: string): Promise<Product | null> 
  {
    try
    {
      const product = await db.product.findUnique({where: { productCode },});
      return product?{
        ...product,
        creationDate: new Date(product.creationDate),
        modificationDate: new Date(product.modificationDate),
      }:null;
    }
    catch(error)
    {
      throw this.handleError(error as Error, this.constructor.name);
    }
  }

  async findByName(productName: string): Promise<Product[] | null> 
  {
    try
    {
      const products = await db.product.findMany({ where: { productName }, });
      return products.length > 0 ? products.map((product) => ({
        ...product,
        creationDate: new Date(product.creationDate),
        modificationDate: new Date(product.modificationDate),
      })) : null;
    }
    catch(error)
    {
      throw this.handleError(error as Error, this.constructor.name);
    }
  
  }

  async create(product: Product): Promise<Product | null> {
    try
    {
      const newProduct = await db.product.create({
        data: {
          ...product,
          creationDate: new Date(),
          modificationDate: new Date(),
          orderItems: { connect: [] },
        },
      });

    return {
      ...newProduct,
      creationDate: new Date(newProduct.creationDate),
      modificationDate: new Date(newProduct.modificationDate),
    };
    } 
    catch(error)
    {
      throw this.handleError(error as Error, this.constructor.name);
    }
  }

  async update(productCode: string, product: Product): Promise<Product | null> 
  {
    try{
         const updatedProduct = await db.product.update({
         where: { productCode },
         data: {
           ...product,
           modificationDate: new Date(),
           orderItems: { connect: [] },
          },
       });

      return updatedProduct?{
        ...updatedProduct,
        creationDate: new Date(updatedProduct.creationDate),
        modificationDate: new Date(updatedProduct.modificationDate),
      }:null;
    }
    catch(error)
    {
      throw this.handleError(error as Error, this.constructor.name);
    }
  }

  async delete(productCode: string): Promise<Product | null> {
    try{
      return await db.product.delete({
        where: { productCode },
    });
    }
    catch(error)
    {
      throw this.handleError(error as Error, this.constructor.name);
    }
  }
  
}