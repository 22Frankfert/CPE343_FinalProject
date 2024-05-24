import { $Enums, Item } from '@prisma/client';
import { IsDate, IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';

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

  @IsDate()
  @IsOptional()
  scheduled: Date;
}
