import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Item } from '@prisma/client';
import { BaseService } from './todo.service.base';

@Injectable()
export class PrismaRepository extends BaseService<Item> {
  constructor(private readonly prismaService: PrismaService) {
    super();
  }

  create(createTodoDto: CreateTodoDto): Promise<Item> {
    if (createTodoDto.dueDate)
      createTodoDto.dueDate = new Date(createTodoDto.dueDate);

    return this.prismaService.item.create({
      data: createTodoDto,
    });
  }

  findAll(): Promise<Item[]> {
    return this.prismaService.item.findMany();
  }

  findOne(id: string): Promise<Item> {
    return this.prismaService.item.findUnique({
      where: { id },
    });
  }

  update(id: string, updateTodoDto: UpdateTodoDto): Promise<Item> {
    if (updateTodoDto.dueDate)
      updateTodoDto.dueDate = new Date(updateTodoDto.dueDate);

    return this.prismaService.item.update({
      where: { id },
      data: updateTodoDto,
    });
  }

  async remove(id: string): Promise<Item> {
    const exitingItem = await this.prismaService.item.findUnique({
      where: { id },
    });
    if (!exitingItem) throw new NotFoundException('Item not found');

    return this.prismaService.item.delete({
      where: { id },
    });
  }
}
