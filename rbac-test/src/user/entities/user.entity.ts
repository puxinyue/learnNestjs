import { Role } from "src/role/entities/role.entity";
import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @UpdateDateColumn()
  updateAt: Date;

  @CreateDateColumn()
  createAt: Date;

  @ManyToMany(() => Role)
  @JoinTable()
  roles: Role[];
}
