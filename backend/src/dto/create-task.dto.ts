import { ApiProperty } from '@nestjs/swagger';

export class CreateTaskDto {
  @ApiProperty({ example: 'Купить хлеб', description: 'Название задачи' })
  title: string;

  @ApiProperty({ example: 'Купить хлеб в магазине после работы', description: 'Описание задачи' })
  description: string;
}
