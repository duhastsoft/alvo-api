import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import bcrypt from 'bcrypt';
import BaseEntity from './common/BaseEntity';
import Exam from './Exam';

export enum UserRole {
  Admin = 'Admin',
  Customer = 'Customer',
}

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  account: string;

  @Column({ unique: true })
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

  @OneToMany(() => Exam, (exam) => exam.user)
  exams?: Exam[];

  checkIfPasswordMatches(unencryptedPassword: string): Promise<boolean> {
    return bcrypt.compare(unencryptedPassword, this.password);
  }
}

export default User;
