import { PartialType } from '@nestjs/mapped-types';
import { CreateBartDto } from './create-bart.dto';

export class UpdateBartDto extends PartialType(CreateBartDto) {}
