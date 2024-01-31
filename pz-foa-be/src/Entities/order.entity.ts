import { OrderInterface } from 'src/Interfaces/order-interface';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('orders')
export class OrderEntity implements OrderInterface {
  @PrimaryGeneratedColumn('uuid', { name: 'ID' })
  id: string;

  @Column({ name: 'USER_ID', type: 'varchar', length: 36 })
  userId: string;

  @Column({ name: 'FIRST_NAME', type: 'varchar', length: 128 })
  firstName: string;

  @Column({ name: 'LAST_NAME', type: 'varchar', length: 128 })
  lastName: string;

  @Column({ name: 'ADDRESS', type: 'varchar', length: 1024 })
  address: string;

  @Column({
    name: 'CREATED_AT',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: string;

  @Column({
    name: 'CHANGED_AT',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  changedAt: string;
}
