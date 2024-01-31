import { ProfileInterface } from 'src/Interfaces/profile-interface';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('profile')
export class ProfileEntity implements ProfileInterface {
  @PrimaryGeneratedColumn('uuid', { name: 'ID' })
  id: string;

  @Column({ name: 'USER_ID', type: 'varchar', length: 36 })
  @Column({ name: 'ADDRESS', type: 'varchar', length: 255 })
  address: string;

  @Column({ name: 'FIRST_NAME', type: 'varchar', length: 127 })
  firstName: string;

  @Column({ name: 'LAST_NAME', type: 'varchar', length: 127 })
  lastName: string;

  @Column({ name: 'PHONE', type: 'int', precision: 9 })
  phone: string;

  @Column({
    name: 'CREATED_AT',
    type: 'timestamp',
    nullable: false,
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: string;

  @Column({
    name: 'UPDATED_AT',
    type: 'timestamp',
    nullable: false,
    default: () => 'CURRENT_TIMESTAMP',
  })
  updatedAt: string;
}
