import { $Enums, Item } from '@prisma/client';
import { IsBoolean, IsDateString, IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';

type CreateTodoType = Omit<Item, 'id' | 'create_at'>;

export class CreateTodoDto implements CreateTodoType {
  @IsString()
  @IsNotEmpty()
  text: string;

  @IsBoolean()
  @IsOptional()
  completed: boolean;

  @IsDateString()
  @IsOptional()
  dueDate: Date;

  @IsEnum($Enums.priorityEnum)
  @IsOptional()
  priority: $Enums.priorityEnum;

}
