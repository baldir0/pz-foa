import { ProductEntity } from '../Entities/product.entity';
import { NewProductInterface } from '../Interfaces/product-interface';
import { DB } from '../utils/database/database';
import {
  AuthErrorLackOfPrivilages,
  ProductErrorNotFound,
} from '../utils/errors';
import { Repository } from 'typeorm';
import messages from '../data/en-EN.json';
import { UserEntity } from '../Entities/user.entity';
import { serviceResult } from 'src/Interfaces/serviceReturn-interface';

class ProductService {
  constructor(
    private productRepo: Repository<ProductEntity> = DB.getRepository(
      ProductEntity
    )
  ) {}

  public async get(productId: string): Promise<serviceResult> {
    const result = await this.productRepo.findOne({
      where: { id: productId },
      select: {
        id: true,
        name: true,
        description: true,
        price: true,
        avalaibleStocks: true,
      },
    });

    if (result)
      return {
        status: 200,
        data: result,
      };

    throw new ProductErrorNotFound();
  }

  public async getAll(): Promise<serviceResult> {
    const result = await this.productRepo.findAndCount({
      select: {
        id: true,
        name: true,
        description: true,
        price: true,
        avalaibleStocks: true,
      },
    });
    if (result[1])
      return {
        status: 200,
        data: result,
      };

    throw new ProductErrorNotFound();
  }

  public async create(
    user: UserEntity,
    productData: NewProductInterface
  ): Promise<serviceResult> {
    const id = crypto.randomUUID();

    await this.productRepo.insert({
      id,
      ...productData,
      createdBy: user.id,
    });

    return {
      status: 201,
      data: {
        id,
      },
    };
  }

  public async update(
    user: UserEntity,
    productId: string,
    productData: NewProductInterface
  ): Promise<serviceResult> {
    const result = await this.productRepo.update(
      { id: productId, createdBy: user.id },
      { ...productData, changedAt: new Date().toString() }
    );

    if (result.affected) {
      return {
        status: 200,
        data: {
          productId: productId,
          updated: productData,
        },
      };
    }

    throw new ProductErrorNotFound();
  }

  public async delete(
    user: UserEntity,
    productId: string
  ): Promise<serviceResult> {
    const selectResult = await this.productRepo.findOne({
      where: { id: productId, createdBy: user.isAdmin ? null : user.id },
      select: { id: true },
    });

    if (!selectResult) throw new AuthErrorLackOfPrivilages();

    const deleteResult = await this.productRepo.delete({ id: productId });

    if (deleteResult.affected)
      return {
        status: 200,
        data: {
          productId: productId,
        },
      };

    throw new ProductErrorNotFound(messages.ERROR.PRODUCT_NOT_FOUND);
  }
}

export const productService = new ProductService();
