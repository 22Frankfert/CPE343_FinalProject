import { Module } from '@nestjs/common';
import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';
import { BaseService } from './todo.service.base';
import { PrismaRepository } from './todo.service.prisma';

@Module({
  controllers: [TodoController],
  providers: [
    TodoService,
    {
      provide: BaseService,
      useClass: PrismaRepository,
    },
  ],
})
export class TodoModule {}
