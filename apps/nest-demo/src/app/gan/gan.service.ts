import { Injectable } from '@nestjs/common';
import { UpdateGanDto } from './dto/update-gan.dto';
import { spawn } from 'child_process';
import * as fs from 'fs';
import https from 'https';

@Injectable()
export class GanService {
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

  kickOffGan(): void {
    this.startProcess('Hosoda');
    this.startProcess('Hayao');
    this.startProcess('Paprika');
    this.startProcess('Shinkai');
  }

  startProcess = async (model: string) => {
    const process = spawn('python', [
      'apps/toonify/src/test.py',
      '--style',
      model,
      '--gpu',
      '0',
    ]);
    return new Promise((resolve, reject) => {
      process.stdout.on('data', function (data) {
        resolve(data.toString());
      });
      process.stderr.on('data', reject);
    });
  };

  uploadImage(id: string) {
    console.log('got id', id);
    return `This action returns a #${id} gan`;
  }

  update(id: number, updateGanDto: UpdateGanDto) {
    return `This action updates a #${id} gan`;
  }

  remove(id: number) {
    return `This action removes a #${id} gan`;
  }
}
