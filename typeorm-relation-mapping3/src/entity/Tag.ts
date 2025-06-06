import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm"
import { Article } from "./Article"

@Entity()
export class Tag {
   @PrimaryGeneratedColumn()
  id: number

  @Column({
    length: 100,
    comment:'标签名称'
  })
  name: string

  @ManyToMany(() => Article, article => article.tags)
  articles: Article[]

}
