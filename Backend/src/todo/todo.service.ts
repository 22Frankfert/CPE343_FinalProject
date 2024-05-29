import { Injectable } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Item } from '@prisma/client';
import { BaseService } from './todo.service.base';

@Injectable()
export class TodoService {
  constructor(private readonly baseService: BaseService<Item>) {}

  create(createTodoDto: CreateTodoDto): Promise<Item> {
    return this.baseService.create(createTodoDto);
  }

  findAll(): Promise<Item[]> {
    return this.baseService.findAll();
  }

  findOne(id: string): Promise<Item> {
    return this.baseService.findOne(id);
  }

  update(id: string, updateTodoDto: UpdateTodoDto): Promise<Item> {
    return this.baseService.update(id, updateTodoDto);
  }

  remove(id: string): Promise<Item> {
    return this.baseService.remove(id);
  }
}
