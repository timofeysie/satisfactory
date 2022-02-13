import { PartialType } from '@nestjs/mapped-types';
import { CreateGenerateDto } from './create-generate.dto';

export class UpdateGenerateDto extends PartialType(CreateGenerateDto) {}
