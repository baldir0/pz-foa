import { userOrdersInterface } from 'src/Interfaces/userOrder-interface';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user_orders')
export class UserOrdersEntity implements userOrdersInterface {
  @PrimaryGeneratedColumn('uuid', { name: 'ID' })
  id: string;

  @Column({ name: 'ORDER_ID', type: 'varchar', length: 32 })
  orderId: string;

  @Column({ name: 'PRODUCT_ID', type: 'varchar', length: 32 })
  productId: string;

  @Column({ name: 'PRICE', type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @Column({ name: 'AMOUNT', type: 'int', precision: 5 })
  amount: number;
}
