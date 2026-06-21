import { TodoStatus } from '../entities/todo.entity';

export class CreateTodoDto {
  title: string;
  description: string;
  status: TodoStatus;
}
