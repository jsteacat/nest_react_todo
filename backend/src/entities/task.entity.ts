import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Task {
  @ApiProperty({ example: 1, description: 'Уникальный идентификатор задачи' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'Купить хлеб', description: 'Название задачи' })
  @Column()
  title: string;

  @ApiProperty({ example: 'Купить хлеб в магазине после работы', description: 'Описание задачи' })
  @Column()
  description: string;
}
