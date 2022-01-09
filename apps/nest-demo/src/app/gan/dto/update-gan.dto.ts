import { PartialType } from '@nestjs/mapped-types';
import { CreateGanDto } from './create-gan.dto';

export class UpdateGanDto extends PartialType(CreateGanDto) {}
