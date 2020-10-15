import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import Category from './Category';
import BaseEntity from './common/BaseEntity';

@Entity()
class Question extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  text: string;

  @Column({ nullable: true })
  image?: string;

  @Column()
  answer1: string;

  @Column()
  answer2: string;

  @Column()
  answer3: string;

  @Column()
  answer4: string;

  @Column()
  rightAnswer: number;

  @ManyToOne(() => Category, (category) => category.questions)
  category: Category;
}

export default Question;
