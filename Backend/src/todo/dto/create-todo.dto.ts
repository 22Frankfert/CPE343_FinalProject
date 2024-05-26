import { $Enums, Item } from '@prisma/client';
import { IsDateString, IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';

type CreateTodoType = Omit<Item, 'id' | 'create_at'>;

export class CreateTodoDto implements CreateTodoType {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsOptional()
  detail: string;

  @IsEnum($Enums.Status)
  @IsOptional()
  status: $Enums.Status;

  @IsDateString()
  @IsOptional()
  scheduled: Date;
}
