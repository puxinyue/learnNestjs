
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

// asdsasa
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

}