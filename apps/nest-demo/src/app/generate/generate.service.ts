import { Injectable } from '@nestjs/common';
import { CreateGenerateDto } from './dto/create-generate.dto';
import { UpdateGenerateDto } from './dto/update-generate.dto';
import { spawn } from 'child_process';

@Injectable()
export class GenerateService {
  async generateText(id: string) {
    const process = spawn('python', [
      'apps/hugging-face/src/text_generator.py',
      id,
    ]);
    return await new Promise((resolve) => {
      process.stdout.on('data', function (data) {
        console.log('generateText:', data.toString());
        resolve(data.toString());
      });
    });
  }
}
