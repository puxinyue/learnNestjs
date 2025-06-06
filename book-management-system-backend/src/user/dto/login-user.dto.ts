import { IsNotEmpty, MinLength } from "class-validator"

export class LoginUserDto {
    @IsNotEmpty({ message: '用户名不能为空' })
    userName:string
    @IsNotEmpty({message:'密码不能为空'})
    @MinLength(6,{message:'密码至少六位'})
    passWord:string
}
