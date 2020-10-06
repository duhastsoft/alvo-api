import { CreateDateColumn, UpdateDateColumn } from 'typeorm';

abstract class BaseEntity {
  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

export default BaseEntity;
