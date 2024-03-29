import {
  AuthErrorLackOfPrivilages,
  OrderErrorInsertionFailed,
  OrderErrorNotFound,
} from './../utils/errors';
import { OrderEntity } from './../../src/Entities/order.entity';
import { ProductOrderEntity } from './../../src/Entities/productOrder.entity';
import { UserEntity } from './../../src/Entities/user.entity';
import {
  NewOrderDataInterface,
  UpdateOrderDataInterface,
} from './../../src/Interfaces/order-interface';
import { AddProductToOrderInterface } from './../../src/Interfaces/productOrder-interface';
import { serviceResult } from './../../src/Interfaces/serviceReturn-interface';
import { DB } from './../../src/utils/database/database';
import { Repository } from 'typeorm';

class OrderService {
  constructor(
    private orderRepo: Repository<OrderEntity> = DB.getRepository(OrderEntity),
    private productOrderRepo: Repository<ProductOrderEntity> = DB.getRepository(
      ProductOrderEntity
    )
  ) {}

  public async getAll(
    user: UserEntity,
    adminRequest?: boolean
  ): Promise<serviceResult> {
    const result = await this.orderRepo.find({
      where: { userId: !adminRequest ? user.id : null },
    });

    return {
      status: 200,
      data: result,
    };
  }

  public async get(user: UserEntity, orderId: string): Promise<serviceResult> {
    const result = await this.orderRepo.findOne({
      where: { id: orderId, userId: user.isAdmin ? null : user.id },
    });

    if (!result) throw new OrderErrorNotFound();

    const orderPositions = await this.productOrderRepo.find({
      where: { orderId },
    });

    return {
      status: 200,
      data: {
        order: result,
        positions: orderPositions,
      },
    };
  }

  public async update(
    user: UserEntity,
    orderId: string,
    orderData: UpdateOrderDataInterface
  ): Promise<serviceResult> {
    let result;
    if (user.isAdmin) {
      result = await this.orderRepo.update(
        {
          id: orderId,
        },
        orderData
      );
    } else {
      result = await this.orderRepo.update(
        {
          id: orderId,
          userId: user.id,
        },
        orderData
      );
    }

    if (result.affected)
      return {
        status: 200,
        data: {
          orderId: orderId,
          newData: orderData,
        },
      };

    throw new OrderErrorNotFound();
  }

  public async delete(orderId: string): Promise<serviceResult> {
    const result = await this.orderRepo.delete({ id: orderId });
    const result2 = await this.productOrderRepo.delete({ orderId });

    return {
      status: 200,
      data: {
        orderId: orderId,
      },
    };
  }

  public async create(
    user: UserEntity,
    data: NewOrderDataInterface
  ): Promise<serviceResult> {
    const { firstName, lastName, address } = data;
    const products: AddProductToOrderInterface[] = data.products;

    if (products.length < 1) throw new OrderErrorInsertionFailed();

    const result = await this.orderRepo.insert({
      userId: user.id,
      address,
      firstName,
      lastName,
    });

    products
      .reduce((pv, cv): AddProductToOrderInterface[] => {
        const idx = pv.findIndex((v) => cv.productId === v.productId);
        if (idx < 0) {
          pv.push(cv);
          return pv;
        }

        pv[idx].amount += cv.amount;

        return pv;
      }, [] as AddProductToOrderInterface[])
      .forEach(async (product) => {
        await this.addProduct(
          product.productId,
          result.identifiers[0].id,
          product.amount,
          product.price
        );
      });

    return {
      status: 201,
      data: {
        orderId: result.identifiers[0].id,
      },
    };
  }

  public async addProduct(
    productId: string,
    orderId: string,
    amount: number,
    price: number
  ): Promise<serviceResult> {
    const positionId = crypto.randomUUID();
    const result = await this.productOrderRepo.insert({
      id: positionId,
      amount,
      orderId,
      productId,
      price,
    });

    if (result)
      return {
        status: 201,
        data: {
          positionId: positionId,
          productId: productId,
        },
      };

    throw new OrderErrorInsertionFailed();
  }

  public async updateOrderPosition(
    orderId: string,
    positionId: string,
    orderData: AddProductToOrderInterface
  ): Promise<serviceResult> {
    const result = await this.productOrderRepo.update(
      { orderId, id: positionId },
      orderData
    );

    if (result.affected)
      return {
        status: 200,
        data: {
          positionId: positionId,
          updated: orderData,
        },
      };
  }

  public async deleteOrderPosition(
    orderId: string,
    positionId: string
  ): Promise<serviceResult> {
    const result = await this.productOrderRepo.delete({
      orderId,
      id: positionId,
    });

    if (result.affected)
      return {
        status: 200,
        data: {
          positionId,
        },
      };

    throw new OrderErrorNotFound();
  }

  public async getOrderPosition(
    user: UserEntity,
    orderId: string,
    positionId: string
  ): Promise<serviceResult> {
    if (!user.isAdmin) {
      const validate = await this.orderRepo.findOneBy({ userId: user.id });
      if (!validate) throw new AuthErrorLackOfPrivilages();
    }

    const result = await this.productOrderRepo.findOne({
      where: {
        orderId,
        id: positionId,
      },
    });

    if (result)
      return {
        status: 200,
        data: result,
      };

    throw new OrderErrorNotFound();
  }
}

export const orderService = new OrderService();
