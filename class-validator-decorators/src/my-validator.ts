// 帮我完成自定义校验
import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';

export function IsEmailOrPhone(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isEmailOrPhone',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          const emailReg = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;
          const phoneReg = /^1[3456789]\d{9}$/;
          return emailReg.test(value) || phoneReg.test(value);
        },
      },
    });
  };
}
