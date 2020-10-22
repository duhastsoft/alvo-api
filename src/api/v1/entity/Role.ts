import { Entity, Column, PrimaryGeneratedColumn, OneToMany} from 'typeorm';
import BaseEntity from './common/BaseEntity';
import User from './User';
import Permission from './Permission'

@Entity()
export class Role extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string

    @Column()
    description: string

    @OneToMany((type) => User, (user) => user.role)
    users: User[];

    @OneToMany((type) => Permission, (permission) => permission.role)
    permisions: Permission[];

}

export default Role;