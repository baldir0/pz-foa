import { OrderEntity } from 'src/Entities/order.entity';
import { ProductOrderEntity } from 'src/Entities/productOrder.entity';
import { UserEntity } from 'src/Entities/user.entity';
import { OrderDataInterface } from 'src/Interfaces/order-interface';
import {
  AddProductToOrderInterface,
  ProductOrderInterface,
} from 'src/Interfaces/productOrder-interface';
import { serviceResult } from 'src/Interfaces/serviceReturn-interface';
import { DB } from 'src/utils/database/database';
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
    orderData: OrderDataInterface
  ): Promise<serviceResult> {
    const result = await this.orderRepo.update(
      {
        id: orderId,
        userId: user.isAdmin ? null : user.id,
      },
      orderData
    );

    return {
      status: 200,
      data: result,
    };
  }

  public async delete(orderId: string): Promise<serviceResult> {
    const result = await this.orderRepo.delete({ id: orderId });

    return {
      status: 200,
      data: result,
    };
  }

  public async create(user: UserEntity): Promise<serviceResult> {
    const result = await this.orderRepo.insert({ userId: user.id });

    return {
      status: 201,
      data: result,
    };
  }

  public async addProduct(
    productId: string,
    orderId: string,
    amount: number
  ): Promise<serviceResult> {
    const result = await this.productOrderRepo.insert({
      id: crypto.randomUUID(),
      amount,
      orderId,
      productId,
    });

    return {
      status: 200,
      data: result,
    };
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

    return {
      status: 200,
      data: result,
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

    return {
      status: 200,
      data: result,
    };
  }
}

export const orderService = new OrderService();
