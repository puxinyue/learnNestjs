import { IsEmail, IsNotEmpty, Length, IsOptional } from 'class-validator';

export class LoginUserDto {
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    @Length(6)
    code: string;
}
