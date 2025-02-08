import { IntersectionType, OmitType, PartialType, PickType } from '@nestjs/mapped-types';
import { CreateAaaDto } from './create-aaa.dto';
import { XxxDto } from './xxx.dto';

// PickType 是从已有 dto 类型中取某个字段。

// OmitType 是从已有 dto 类型中去掉某个字段。

// PartialType 是把 dto 类型变为可选。

// IntersectionType 是组合多个 dto 类型。
export class UpdateAaaDto extends IntersectionType(
  PickType(CreateAaaDto, ['name', 'age']),
  PartialType(OmitType(XxxDto, ['yyy']))
) { // name age 必填 ,xxx不是必填

}
