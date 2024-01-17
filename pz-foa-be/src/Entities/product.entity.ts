import { ProductInterface } from 'src/Interfaces/product-interface';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('products')
export class ProductEntity implements ProductInterface {
  @PrimaryGeneratedColumn('uuid', { name: 'ID' })
  id: string;

  @Column({ name: 'NAME', type: 'varchar', length: 64 })
  name: string;

  @Column({ name: 'DESC', type: 'varchar', length: 1024 })
  description: string;

  @Column({ name: 'PRICE', type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @Column({ name: 'AVL_STOCK', type: 'int', precision: 5 })
  avalaibleStocks: number;

  @Column({
    name: 'CREATED_AT',
    type: 'datetime',
    nullable: true,
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: string;

  @Column({
    name: 'CHANGED_AT',
    type: 'datetime',
    nullable: true,
    default: null,
  })
  changedAt: string;

  @Column({
    name: 'CREATED_BY',
    type: 'varchar',
  })
  createdBy: string;
}
