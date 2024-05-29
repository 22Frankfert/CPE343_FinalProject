import { CreateTodoDto } from 'src/todo/dto/create-todo.dto';
import { UpdateTodoDto } from 'src/todo/dto/update-todo.dto';

export abstract class BaseService<T> {
  abstract findAll(): Promise<T[]>;
  abstract findOne(id: string): Promise<T>;
  abstract create(createDto: CreateTodoDto): Promise<T>;
  abstract update(id: string, updateDto: UpdateTodoDto): Promise<T>;
  abstract remove(id: string): Promise<T>;
}
