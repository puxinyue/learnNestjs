import { IsBoolean, IsNotEmpty, IsNumber, MaxLength, MinLength } from "class-validator";

export class CreateAaaDto {
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(10)
  name: string;

  @IsNotEmpty()
  @IsNumber()
  age: number;

  @IsNotEmpty()
  @IsBoolean()
  sex: boolean;

  hoobies: string[]
}
