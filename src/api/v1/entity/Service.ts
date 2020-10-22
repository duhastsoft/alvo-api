import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, Long} from 'typeorm';
import BaseEntity from './common/BaseEntity';
import ServiceCategory from './ServiceCategory';

@Entity()
export class Service extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string

    @Column()
    description: string

    @Column()
    serviceHours: string

    @Column()
    contactNumber: string

    @Column()
    address: string

    @Column()
    contactName: string

    @Column()
    image: string

    @Column()
    latitud: string

    @Column()
    longitude: string

    @Column()
    priceRange: string

    @ManyToOne((type) => ServiceCategory, (category) => category.services)
    category: ServiceCategory;

}

export default Service;