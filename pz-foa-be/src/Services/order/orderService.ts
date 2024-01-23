import { OrderEntity } from 'src/Entities/order.entity';
import { DB } from 'src/utils/database/database';
import { Repository } from 'typeorm';

class OrderService {
  constructor(
    private orderRepo: Repository<OrderEntity> = DB.getRepository(OrderEntity)
  ) {}
}
