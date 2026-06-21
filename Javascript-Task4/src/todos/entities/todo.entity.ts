import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

export type TodoStatus = 'pending' | 'in-progress' | 'completed';

@Entity()
export class Todo {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({ default: 'pending' })
  status: TodoStatus;
}
