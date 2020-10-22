import { Entity, Column, PrimaryGeneratedColumn, ManyToOne} from 'typeorm';
import BaseEntity from './common/BaseEntity';
import Role from './Role';

@Entity()
export class Permission extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string

    @Column('simple-array')
    actions: string[]

    @ManyToOne((type) => Role, (role) => role.permisions)
    role: Role;

}

export default Permission;