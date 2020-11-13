import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import ExamQuestion from './ExamQuestion';
import User from './User';

@Entity()
class Exam {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'timestamp with time zone', name: 'start_time' })
  startTime: Date;

  @Column({ type: 'timestamp with time zone', name: 'end_time' })
  endTime: Date;

  @Column({ name: 'exam_type' })
  examType: string;

  @Column({ nullable: true })
  category?: number;

  @Column('decimal')
  grade: number;

  @Column('uuid', { name: 'user_id' })
  userId: string;

  @ManyToOne(() => User, (user) => user.exams)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @OneToMany(() => ExamQuestion, (examQuestions) => examQuestions.exam)
  examQuestions: ExamQuestion[];

  calculateGrade(totalRightAnswers: number, totalQuestions: number): void {
    const gradeWithoutRounding = (totalRightAnswers / totalQuestions) * 10;
    this.grade = Math.round((gradeWithoutRounding + Number.EPSILON) * 100) / 100;
  }
}

export default Exam;
