import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, Tree, TreeChildren, TreeParent, UpdateDateColumn } from "typeorm";

@Entity()
@Tree('closure-table')
export class City {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 100,
    comment: '城市名称'
  })
  name: string;

  @Column({
    default: 0,
  })
  status: number;
 
  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @TreeChildren()
  children: City[];

  @TreeParent()
  parent: City;

}
