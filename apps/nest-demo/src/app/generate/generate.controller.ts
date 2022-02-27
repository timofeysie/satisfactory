import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { GenerateService } from './generate.service';
import { CreateGenerateDto } from './dto/create-generate.dto';
import { UpdateGenerateDto } from './dto/update-generate.dto';

@Controller('generate')
export class GenerateController {
  constructor(private readonly generateService: GenerateService) {}

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.generateService.generateText(id);
  }
}
