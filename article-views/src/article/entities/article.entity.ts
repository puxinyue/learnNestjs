import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Article {
    @PrimaryGeneratedColumn()
    id: number;
    @Column({
        comment: '文章标题',
        length: 50
    })
    title: string;

    @Column({
        comment: '文章内容',
    })
    content: string;

    @Column({
        comment: '阅读量',
        default: 0
    })
    views: number;

    @Column({
        comment: '点赞量',
        default: 0
    })
    likeCount: number;

    @Column({
        comment: '收藏量',
        default: 0
    })
    collect: number;
    
}
