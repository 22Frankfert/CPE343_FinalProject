import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Item } from '@prisma/client';
import { BaseService } from './todo.service.base';

@Injectable()
export class TodoService {
  constructor(private readonly baseService: BaseService<Item>) {}

  create(createTodoDto: CreateTodoDto): Promise<Item> {

    if (createTodoDto.dueDate)
      createTodoDto.dueDate = new Date(createTodoDto.dueDate);

    return this.baseService.create(createTodoDto);
  }

  findAll(): Promise<Item[]> {
    return this.baseService.findAll();
  }

  findOne(id: string): Promise<Item> {
    return this.baseService.findOne(id);
  }

  update(id: string, updateTodoDto: UpdateTodoDto): Promise<Item> {

    if (updateTodoDto.dueDate)
      updateTodoDto.dueDate = new Date(updateTodoDto.dueDate);

    return this.baseService.update(id, updateTodoDto);
  }

  async remove(id: string): Promise<Item> {

    const exitingItem = await this.baseService.findOne(id);
    if (!exitingItem) throw new NotFoundException('Item not found');

    return this.baseService.remove(id);
  }
}
