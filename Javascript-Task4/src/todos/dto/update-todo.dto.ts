import { TodoStatus } from '../entities/todo.entity';

export class UpdateTodoDto {
  title?: string;
  description?: string;
  status?: TodoStatus;
}
