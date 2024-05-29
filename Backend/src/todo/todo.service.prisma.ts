import { Injectable } from '@nestjs/common';
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

    return this.prismaService.item.update({
      where: { id },
      data: updateTodoDto,
    });
  }

  async remove(id: string): Promise<Item> {

    return this.prismaService.item.delete({
      where: { id },
    });
  }
}
