import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import Category from './Category';
import BaseEntity from './common/BaseEntity';
import ExamQuestion from './ExamQuestion';

@Entity()
class Question extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  text: string;

  @Column({ nullable: true })
  localImage?: string;

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

  @Column({ default: false })
  requiresOrder: boolean;

  @ManyToOne(() => Category, (category) => category.questions)
  category: Category;

  @OneToMany(() => ExamQuestion, (examQuestion) => examQuestion.question)
  examQuestions: ExamQuestion[];
}

export default Question;
