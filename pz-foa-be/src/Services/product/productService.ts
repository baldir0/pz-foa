import { NextFunction, Response } from 'express';
import { ProductEntity } from './../../../src/Entities/product.entity';
import { NewProductInterface } from './../../../src/Interfaces/product-interface';
import { DB } from './../../../src/utils/database/database';
import {
  AuthError,
  AuthErrorUnauthorized,
  ProductError,
  ProductErrorInsertionFailed,
  ProductErrorNotFound,
} from './../../../src/utils/errors';
import { Repository } from 'typeorm';
import messages from './../../data/en-EN.json';
import { UserEntity } from './../../../src/Entities/user.entity';

class ProductService {
  constructor(
    private productRepo: Repository<ProductEntity> = DB.getRepository(
      ProductEntity
    ),
    private userRepo: Repository<UserEntity> = DB.getRepository(UserEntity)
  ) {}

  public async create(
    productData: NewProductInterface,
    token: string,
    res: Response,
    next: NextFunction
  ) {
    try {
      const id = crypto.randomUUID();

      if (!token) {
        return next(
          new AuthErrorUnauthorized(messages.ERROR.INVALID_LOGIN_DATA)
        );
      }
      const user = await this.userRepo.findOne({
        select: { id: true },
        where: { token: token },
      });
      await this.productRepo.insert({
        id,
        ...productData,
        createdBy: user.id,
      });

      res.status(201).json({ message: 'Product created!', productId: id });
    } catch {
      next(
        new ProductErrorInsertionFailed(
          messages.ERROR.PRODUCT_INSERTION_FAILURE
        )
      );
    }
  }

  public async delete(productId: string, res: Response, next: NextFunction) {
    try {
      const result = await this.productRepo.delete({ id: productId });
      if (!result.affected) {
        return next(new ProductErrorNotFound(messages.ERROR.PRODUCT_NOT_FOUND));
      }
      res.status(200).json({ message: `Product ${productId} deleted!` });
    } catch {
      next(new ProductErrorNotFound(messages.ERROR.PRODUCT_NOT_FOUND));
    }
  }

  public async get(productId: string, res: Response) {
    try {
      const result = await this.productRepo.findBy({ id: productId });
      res.status(200).json({ product: result[0] });
    } catch {
      throw new ProductErrorNotFound(messages.ERROR.PRODUCT_NOT_FOUND);
    }
  }

  public async update(
    productId: string,
    productData: NewProductInterface,
    token: string,
    res: Response,
    next: NextFunction
  ) {
    try {
      if (!token) next(new AuthError(messages.ERROR.UNAUTHORIZED_USER));

      const user = await this.userRepo.findOne({
        select: { id: true },
        where: { token: token },
      });
      await this.productRepo.update(
        { id: productId, createdBy: user.id },
        { ...productData, changedAt: new Date().toString() }
      );
      res.status(200).json({
        message: `Product ${productId} updated!`,
        newData: productData,
      });
    } catch {
      throw new ProductErrorNotFound(messages.ERROR.PRODUCT_NOT_FOUND);
    }
  }

  public async getAll(res: Response) {
    try {
      const result = await this.productRepo.findAndCount();
      res.status(200).json(result);
    } catch {
      throw new ProductError('Something went wrong!');
    }
  }
}

export const productService = new ProductService();
