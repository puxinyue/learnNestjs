import { Permission } from "src/permission/entities/permission.entity";
import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class User {
 @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 100
  })
  username: string;

  @Column({
    length: 100
  })
  password: string;
  
  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToMany(() => Permission)
  @JoinTable()
  permissions: Permission[];


}
