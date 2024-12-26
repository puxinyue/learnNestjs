import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { Employee } from "./Employee"

@Entity()
export class Department {
@PrimaryGeneratedColumn()
  id: number

  @Column({
    length:50,
    comment:'部门'
  })
  name: string
  @OneToMany(() => Employee,(dmployee)=>dmployee.department,{cascade:true})
  employees: Employee[]
}
