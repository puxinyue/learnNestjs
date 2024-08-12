import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity({name: 't_aaa'})
export class Aaa {
    @PrimaryGeneratedColumn({
      comment: '这是id'
    })
    id: number
    
    @Column({
      comment: '这是name',
      type:'text'
    })
    name: string

    @Column({
      comment: '这是bbb',
      type:'double'
    })
    bbb: number

    @Column({
      comment: '这是ccc',
      type:'varchar',
      default:'ccc',
      nullable:false, // 非空
      length: 20,
      unique:true // 唯一索引
    })
    ccc:string
}