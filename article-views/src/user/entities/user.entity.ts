import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;
    @Column({
        comment: '用户名',
    })
    userName: string;
    @Column({
        comment: '密码',
    })
    passWord: string;
}
