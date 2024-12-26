import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class IdCard {
  @PrimaryGeneratedColumn()
  id: number

  @Column({
    length: 50,
    nullable: false,
    comment: '身份证件号码'
  })
  cardName: string
}
