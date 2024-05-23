import { Module } from '@nestjs/common';

import { ConfigModule } from '@nestjs/config';
import { TodoModule } from './todo/todo.module';
import { PrismaModule } from 'nestjs-prisma';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'],
    }),
    PrismaModule.forRoot({ isGlobal: true }),
    TodoModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
