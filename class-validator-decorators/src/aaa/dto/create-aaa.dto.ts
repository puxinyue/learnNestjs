import { ArrayContains, IsEmail, IsIn, IsNotEmpty, IsNotIn, IsOptional, IsString } from "class-validator";
import { IsEmailOrPhone } from '../../my-validator';
export class CreateAaaDto {
  @IsNotEmpty({ message: 'Email is required' })
  @IsEmail({}, { message: 'Email must be a valid email' })
  @IsString({ message: 'Email must be a string' })
  // @IsOptional() //加上这个就是可选的
  @IsIn(['aaa@aa.com', 'bbb@bb.com'], { message: 'Email must be aaa@aa.com or bbb@bb.com' })
  // @IsNotIn，可以限制属性不能是某些值：
  // @IsNotIn(['aaa@aa.com', 'bbb@bb.com'])
  // @IsNumberString，可以限制属性是数字字符串：
  // @IsPositive，可以限制属性是正数：
  // @IsNegative，可以限制属性是负数：
  // @IsInt，可以限制属性是整数：
  // @IsBoolean，可以限制属性是布尔值：
  // @IsDate，可以限制属性是日期：
  // @IsString，可以限制属性是字符串：
  // @IsArray，可以限制属性是数组：
  // @IsEnum，可以限制属性是枚举值：
  // @IsNotEmpty，可以限制属性不为空：
  // @IsOptional，可以限制属性是可选的：
  // @IsNumber，可以限制属性是数字：
  // @IsEmail，可以限制属性是邮箱：
  // @IsUrl，可以限制属性是URL：
  // @IsUUID，可以限制属性是UUID：
  // @IsFQDN，可以限制属性是FQDN：
  // @IsPhoneNumber，可以限制属性是电话号码：
  //@ArrayContains 指定数组里必须包含的值：
  // @ArrayContains(['aaa'])
  //当你允许传空字符串的时候就可以用 @IsDefined。
  //@IsDivisibleBy 是必须被某个数整除。
  // @IsAlpha 检查是否只有字母

  // @IsAlphanumeric 检查是否只有字母和数字

  // @Contains 是否包含某个值

  email: string;

  @IsNotEmpty()
  @IsEmailOrPhone({ message: 'Phone must be a valid email or phone' })
  phone: string;
}
