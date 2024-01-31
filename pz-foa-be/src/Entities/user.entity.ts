import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { UserInterface } from '../Interfaces/user-interface';

@Entity('users')
export class UserEntity implements UserInterface {
  @PrimaryGeneratedColumn('uuid', { name: 'ID' })
  id: string;

  @Column({
    name: 'LOGIN',
    unique: true,
    type: 'varchar',
    length: 255,
    nullable: false,
  })
  login: string;

  @Column({
    name: 'EMAIL',
    unique: true,
    type: 'varchar',
    length: 255,
    nullable: false,
  })
  email: string;

  @Column({ name: 'PASS_HASH', type: 'varchar' })
  passwordHSW: string;

  @Column({ name: 'SALT', type: 'varchar', length: 36 })
  salt: string;

  @Column({
    name: 'TOKEN',
    type: 'varchar',
    nullable: true,
    default: null,
  })
  token: string;

  @Column({
    name: 'IS_ADMIN',
    type: 'boolean',
    nullable: true,
    default: false,
  })
  isAdmin: boolean;

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
    default: () => 'CURRENT_TIMESTAMP',
  })
  changedAt: string;
}
