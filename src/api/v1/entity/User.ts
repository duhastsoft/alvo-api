import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import BaseEntity from './common/BaseEntity';
import Role from './Role';

@Entity()
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column()
    account: string;
    
    @Column()
    email: string;
    
    @Column()
    password: string;
    
    @Column({default:''})
    givenName: string;
    
    @Column({default:''})
    lastName: string;

    @Column({default:1})
    status: number;

    @ManyToOne((type) => Role, (role) => role.users)
    role: Role;

}

export default User;

