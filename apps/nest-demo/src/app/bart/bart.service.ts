import { Injectable } from '@nestjs/common';
import { CreateBartDto } from './dto/create-bart.dto';
import { spawn } from 'child_process';
import * as fs from 'fs';

@Injectable()
export class BartService {
  create(createBartDto: CreateBartDto) {
    return 'This action adds a new BART';
  }

  loadSummary() {
    console.log('loadSummary');
    return new Promise((resolve, reject) => {
      const path = `./apps/nest-demo/src/app/bart/summary.txt`;
      fs.readFile(path,'utf-8', (err, file) => {
        if (err) {
          reject(err);
        }
        console.log('loadSummary', file);
        resolve(file);
      });
    });
  }

  findOne(id: string) {
    console.log('findOne');
    const process = spawn('python', ['apps/hugging-face/src/bart.py', id]);
    return new Promise((resolve, reject) => {
      process.stdout.on('data', function (data) {
        resolve(data.toString());
      });
      process.stderr.on('data', reject);
    });
  }

  async getArticleSummary(articleUrl: any) {
    console.log('getArticleSummary');
    const process = spawn('python', [
      'apps/hugging-face/src/goose.py',
      articleUrl,
    ]);
    return new Promise((resolve, reject) => {
      process.stdout.on('data', function (data) {
        const path = `./apps/nest-demo/src/app/bart/summary.txt`;
        const file = fs.createWriteStream(path);
        file.on('error', function (err) {
          /* error handling */
        });
        file.write(data.toString());
        file.end();
        resolve(data.toString());
      });
      process.stderr.on('data', reject);
    }).catch((err) => {
      const buf = Buffer.from(err);
      console.log('getArticleSummary service err', buf.toString());
    });
  }

  faceHugger(articleText: string) {
    console.log('getArticleSummary');
    const process = spawn('python', [
      'apps/hugging-face/src/goose.py',
      articleText,
    ]);
    return new Promise((resolve, reject) => {
      process.stdout.on('data', function (data) {
        console.log('Sending Info', data.toString('utf8'));
        resolve(data.toString());
      });
      process.stderr.on('data', reject);
    });
  }
}
