import { Injectable } from '@nestjs/common';
import { CreateGanDto } from './dto/create-gan.dto';
import { UpdateGanDto } from './dto/update-gan.dto';
import { spawn } from 'child_process';

@Injectable()
export class GanService {
  downloadImage(links: any) {
    return 'This action downloads an image for the gan '+links;
  }

  findAll() {
    console.log('findAll test');
    const process = spawn('python', [
      'apps/toonify/src/test.py',
      '--style',
      'Hosoda',
      '--gpu',
      '0',
    ]);
    return new Promise((resolve, reject) => {
      process.stdout.on('data', function (data) {
        resolve(data.toString());
      });
      process.stderr.on('data', reject);
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} gan`;
  }

  update(id: number, updateGanDto: UpdateGanDto) {
    return `This action updates a #${id} gan`;
  }

  remove(id: number) {
    return `This action removes a #${id} gan`;
  }
}
