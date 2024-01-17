import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { UserInterface } from '../Interfaces/user-interface';

@Entity('users')
export class UserEntity implements UserInterface {
  @PrimaryGeneratedColumn('uuid', { name: 'ID' })
  id: string;

  @Column({ name: 'LOGIN', unique: true, type: 'varchar', length: 255 })
  login: string;

  @Column({ name: 'EMAIL', unique: true, type: 'varchar', length: 255 })
  email: string;

  @Column({ name: 'PASS_HASH', type: 'varchar' })
  passwordHSW: string;

  @Column({ name: 'SALT', type: 'varchar', length: 32 })
  salt: string;

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
    name: 'TOKEN',
    type: 'varchar',
    nullable: true,
    default: null,
  })
  token: string;
}
