import { Response } from 'express';
import { OrderEntity } from 'src/Entities/order.entity';
import { UserEntity } from 'src/Entities/user.entity';
import { DB } from 'src/utils/database/database';
import { Repository } from 'typeorm';

class OrderService {
  constructor(
    private orderRepo: Repository<OrderEntity> = DB.getRepository(OrderEntity)
  ) {}

  public async getAll(res: Response) {}
  public async get(orderId: string, res: Response) {}
  public async update(orderData, res: Response) {}
  public async delete(orderId: string, res: Response) {}
  public async create(orderData, res: Response) {}
}

export const orderService = new OrderService();
