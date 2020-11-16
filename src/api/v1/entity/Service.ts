import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, Long, Index, JoinColumn} from 'typeorm';
import BaseEntity from './common/BaseEntity';
import ServiceCategory from './ServiceCategory';

@Entity()
export class Service extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Index({ fulltext: true})
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
    @JoinColumn({ name: 'categoryId' })
    category: ServiceCategory;

    @Column({nullable: false})
    categoryId: number

}

export default Service;