import { PartialType } from '@nestjs/mapped-types';
import { CreateTrendDto } from './create-trend.dto';

export class UpdateTrendDto extends PartialType(CreateTrendDto) {}
