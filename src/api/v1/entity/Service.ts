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

    @Column({default: 'La Libertad'})
    states: string

    @Column({default: 'Santa Tecla'})
    cities: string

    @Column()
    contactName: string

    @Column()
    image: string

    @Column({type: 'decimal' ,nullable: true})
    latitud: number

    @Column({type: 'decimal', nullable: true})
    longitude: number

    @Column()
    priceRange: string

    @ManyToOne((type) => ServiceCategory, (category) => category.services)
    @JoinColumn({ name: 'categoryId' })
    category: ServiceCategory;

    @Column({nullable: false})
    categoryId: number

}

export default Service;