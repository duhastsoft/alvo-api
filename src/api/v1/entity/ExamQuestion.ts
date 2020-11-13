import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import Exam from './Exam';
import Question from './Question';

@Entity()
class ExamQuestion {
  @PrimaryColumn({ name: 'question_id' })
  questionId: number;

  @PrimaryColumn({ name: 'exam_id' })
  examId: number;

  @Column({ name: 'selected_answer' })
  selectedAnswer: number;

  @Column({ name: 'right_answer' })
  rightAnswer: number;

  @ManyToOne(() => Exam, (exam) => exam.examQuestions)
  @JoinColumn({ name: 'exam_id' })
  exam: Exam;

  @ManyToOne(() => Question, (question) => question.examQuestions)
  @JoinColumn({ name: 'question_id' })
  question: Question;
}

export default ExamQuestion;
