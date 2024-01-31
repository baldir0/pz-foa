import { ProductOrderInterface } from 'src/Interfaces/productOrder-interface';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('product_order')
export class ProductOrderEntity implements ProductOrderInterface {
  @PrimaryGeneratedColumn('uuid', { name: 'ID' })
  id: string;

  @Column({ name: 'ORDER_ID', type: 'varchar', length: 36 })
  orderId: string;

  @Column({ name: 'PRODUCT_ID', type: 'varchar', length: 36 })
  productId: string;

  @Column({ name: 'AMOUNT', type: 'int', precision: 5 })
  amount: number;

  @Column({ name: 'PRICE', type: 'decimal', precision: 10, scale: 2 })
  price: number;
}
