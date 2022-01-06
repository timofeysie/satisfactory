import { Injectable } from '@nestjs/common';
import { CreateBartDto } from './dto/create-bart.dto';
import { spawn } from 'child_process';

@Injectable()
export class BartService {
  create(createBartDto: CreateBartDto) {
    return 'This action adds a new BART';
  }

  findOne(id: string) {
    const process = spawn('python', ['apps/hugging-face/src/bart.py', id]);
    return new Promise((resolve, reject) => {
      process.stdout.on('data', function (data) {
        console.log('Sending Info', data.toString('utf8'));
        resolve(data.toString());
      });
      process.stderr.on('data', reject);
    });
  }

  getArticleSummary(articleUrl: any) {
    const process = spawn('python', [
      'apps/hugging-face/src/goose.py',
      articleUrl,
    ]);
    return new Promise((resolve, reject) => {
      process.stdout.on('data', function (data) {
        console.log('bart api', data.toString('utf8'));
        resolve(data.toString());
      });
      process.stderr.on('data', reject);
    });
  }

  faceHugger(articleText: string) {
    const process = spawn('python', [
      'apps/hugging-face/src/bart.py',
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
