import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Permission {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({
    nullable:true
  })
  desc:string

 @CreateDateColumn()
  createAt: Date;

  @UpdateDateColumn()
  updateAt: Date;
  
}
