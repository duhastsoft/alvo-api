import { Entity, Column, PrimaryGeneratedColumn, OneToMany} from 'typeorm';
import BaseEntity from './common/BaseEntity';
import Service from './Service';

@Entity()
export class ServiceCategory extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string

    @Column()
    description: string

    @OneToMany((type) => Service, (service) => service.category)
    services: Service[];

}

export default ServiceCategory;