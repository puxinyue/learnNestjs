import { PartialType } from '@nestjs/mapped-types';
import { CreateGggDto } from './create-ggg.dto';

export class UpdateGggDto extends PartialType(CreateGggDto) {}
