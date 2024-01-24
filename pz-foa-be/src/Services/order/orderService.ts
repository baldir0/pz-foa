import { OrderEntity } from 'src/Entities/order.entity';
import { UserEntity } from 'src/Entities/user.entity';
import { OrderDataInterface } from 'src/Interfaces/order-interface';
import { serviceResult } from 'src/Interfaces/serviceReturn-interface';
import { DB } from 'src/utils/database/database';
import { AuthErrorLackOfPrivilages } from 'src/utils/errors';
import { Repository } from 'typeorm';

class OrderService {
  constructor(
    private orderRepo: Repository<OrderEntity> = DB.getRepository(OrderEntity)
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

    return {
      status: 200,
      data: result,
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

  public async delete(
    user: UserEntity,
    orderId: string
  ): Promise<serviceResult> {
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
}

export const orderService = new OrderService();
