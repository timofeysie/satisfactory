import { S3 } from 'aws-sdk';
import { Logger, Injectable } from '@nestjs/common';
import { UpdateGanDto } from './dto/update-gan.dto';
import { spawn } from 'child_process';
import * as fs from 'fs';
import https from 'https';

@Injectable()
export class GanService {
  cleanUp() {
    const bucketDir = './apps/nest-demo/src/app/gan/bucket';
    const toonifiedDir = './apps/toonify/src/cartooned_img';
    const testImageDir = './apps/toonify/src/test_img';
    const summariesDir = './apps/nest-demo/src/app/bart/summaries';
    // posts/ ???
    fs.readdirSync(bucketDir).forEach((f) => fs.rmSync(`${bucketDir}/${f}`));
    fs.readdirSync(toonifiedDir).forEach((f) =>
      fs.rmSync(`${toonifiedDir}/${f}`)
    );
    fs.readdirSync(testImageDir).forEach((f) =>
      fs.rmSync(`${testImageDir}/${f}`)
    );
    fs.readdirSync(summariesDir).forEach((f) =>
      fs.rmSync(`${summariesDir}/${f}`)
    );
  }

  async kickOffGan(): Promise<void> {
    console.log('gan.service.kickOffGan: start all');
    try {
      await Promise.all([
        this.startProcess('Hosoda'),
        this.startProcess('Hayao'),
        this.startProcess('Paprika'),
        this.startProcess('Shinkai')
      ]);
    } catch (error) {
      console.error('gan.service.kickOffGan error:', error);
      throw error;
    }
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
        console.log('gan.service.startProcess: resolved', data.toString());
        resolve(data.toString());
      });
      process.stderr.on('data', (data) => {
        console.error('gan.service.startProcess error:', data.toString());
        reject(new Error(data.toString()));
      });
    });
  };

  async uploadImage(file, originalFileName) {
    const bucketS3 = 'one-public-bucket';
    if (file.buffer) {
      return await this.uploadS3(file.buffer, bucketS3, originalFileName);
    } else return 'error';
  }

  async uploadS3(file, bucket, name) {
    const s3 = this.getS3();
    const params = {
      Bucket: bucket,
      Key: String(name),
      Body: new Buffer(file),
    };
    return new Promise((resolve, reject) => {
      s3.upload(params, (err, data) => {
        if (err) {
          console.log('gan.service: err', err);
          Logger.error(err);
          reject(err.message);
        }
        console.log('gan.service: resolved', data);
        this.writeS3ResultFile(name, data);
        resolve(data);
      });
    });
  }

  writeS3ResultFile(bucketFilename, data) {
    const origFilename = encodeURIComponent(bucketFilename);
    const remove = origFilename.split('(').join('%28');
    const filename = remove.split(')').join('%29');
    const path = `./apps/nest-demo/src/app/gan/bucket/${filename}.json`;
    console.log('gan.service.writeS3ResultFile: filename', filename);
    const file = fs.createWriteStream(path);
    file.on('error', function (err) {
      console.log('gan.service.writeS3ResultFile: process err', err);
    });
    file.write(JSON.stringify(data, undefined, 2), (err) => {
      if (err) console.log('gan.service.writeS3ResultFile: err', err);
    });
    file.end();
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
