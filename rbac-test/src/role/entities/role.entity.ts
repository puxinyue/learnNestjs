import { Permission } from "src/permission/entities/permission.entity";
import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Role {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

 @CreateDateColumn()
  createAt: Date;

  @UpdateDateColumn()
  updateAt: Date;

  @ManyToMany(() => Permission)
  @JoinTable()
  permissions: Permission[];

}
