import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class TestEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({
    length: 100
  })
  name: string;
  @Column()
  age: number;
}