import { PartialType } from '@nestjs/mapped-types';
import { CreateTextDto } from './create-text.dto';

export class UpdateTextDto extends PartialType(CreateTextDto) {}
