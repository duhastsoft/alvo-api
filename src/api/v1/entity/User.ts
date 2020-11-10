import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import BaseEntity from './common/BaseEntity';

export enum UserRole {
  Admin = 'Admin',
  Customer = 'Customer',
}

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  account: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ default: '' })
  givenName: string;

  @Column({ default: '' })
  lastName: string;

  @Column({ default: 1 })
  status: number;

  @Column({ type: 'varchar' })
  role: UserRole;
}

export default User;
