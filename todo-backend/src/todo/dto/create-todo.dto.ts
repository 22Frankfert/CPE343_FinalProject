import { $Enums, Item } from '@prisma/client';
import { IsDate, IsEnum, IsNotEmpty, IsString } from 'class-validator';

type CreateTodoType = Omit<Item, 'id' | 'create_at'>;

export class CreateTodoDto implements CreateTodoType {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  detail: string;

  @IsEnum($Enums.Status)
  status: $Enums.Status;

  @IsDate()
  scheduled: Date;
}
