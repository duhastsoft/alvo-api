import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import BaseEntity from './common/BaseEntity';
import Question from './Question';

@Entity()
class Category extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  icon?: string;

  @Column({ nullable: true })
  description?: string;

  @OneToMany((type) => Question, (question) => question.category)
  questions: Question[];
}

export default Category;
