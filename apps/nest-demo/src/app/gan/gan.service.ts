import { S3 } from 'aws-sdk';
import { Logger, Injectable } from '@nestjs/common';
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

  async uploadImage(file, originalname) {
    console.log('file', file);
    const bucketS3 = 'one-public-bucket';
    await this.uploadS3(file.buffer, bucketS3, originalname);
  }

  async uploadS3(file, bucket, name) {
    const s3 = this.getS3();
    const params = {
      Bucket: bucket,
      Key: String(name),
      Body: JSON.stringify(file),
    };
    return new Promise((resolve, reject) => {
      s3.upload(params, (err, data) => {
        if (err) {
          console.log('err', err);
          Logger.error(err);
          reject(err.message);
        }
        console.log('resolved', data);
        resolve(data);
      });
    });
  }

  getS3() {
    return new S3({
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    });
  }

  update(id: number, updateGanDto: UpdateGanDto) {
    return `This action updates a #${id} gan`;
  }

  remove(id: number) {
    return `This action removes a #${id} gan`;
  }
}
