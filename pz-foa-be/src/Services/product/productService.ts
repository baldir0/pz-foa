import { Response } from 'express';
import { ProductEntity } from './../../../src/Entities/product.entity';
import { NewProductInterface } from './../../../src/Interfaces/product-interface';
import { DB } from './../../../src/utils/database/database';
import {
  ProductErrorInertionFailed,
  ProductErrorNotFound,
} from './../../../src/utils/errors';
import { Repository } from 'typeorm';
import messages from './../../data/en-EN.json';

export class ProductService {
  constructor(
    private productRepo: Repository<ProductEntity> = DB.getRepository(
      ProductEntity
    )
  ) {}

  public async create(productData: NewProductInterface, res: Response) {
    try {
      const id = crypto.randomUUID();
      await this.productRepo.insert({
        id,
        ...productData,
      });

      res.status(201).json({ message: 'Product created!', productId: id });
    } catch {
      throw new ProductErrorInertionFailed(
        messages.ERROR.PRODUCT_INSERTION_FAILURE
      );
    }
  }

  public async delete(productId: string, res: Response) {
    try {
      await this.productRepo.delete({ id: productId });
      res.status(200).json({ message: `Product ${productId} deleted!` });
    } catch {
      throw new ProductErrorNotFound(messages.ERROR.PRODUCT_NOT_FOUND);
    }
  }

  public async get(productId: string, res: Response) {}

  public async update(
    productId: string,
    productData: NewProductInterface,
    res: Response
  ) {}
}
