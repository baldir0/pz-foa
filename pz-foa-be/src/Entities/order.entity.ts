import { OrderInterface } from 'src/Interfaces/order-interface';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('orders')
export class OrderEntity implements OrderInterface {
  @PrimaryGeneratedColumn('uuid', { name: 'ID' })
  id: string;

  @Column({ name: 'USER_ID', type: 'varchar', length: 36 })
  userId: string;

  @Column({
    name: 'CREATED_AT',
    type: 'timestamp',
    nullable: true,
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: string;

  @Column({
    name: 'CHANGED_AT',
    type: 'timestamp',
    nullable: true,
    default: () => 'CURRENT_TIMESTAMP',
  })
  changedAt: string;
}
