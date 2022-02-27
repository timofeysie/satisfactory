import { Injectable } from '@nestjs/common';
import { CreateBartDto } from './dto/create-bart.dto';
import { spawn } from 'child_process';
import * as fs from 'fs';
import { throwError } from 'rxjs';

@Injectable()
export class BartService {
  create(createBartDto: CreateBartDto) {
    return 'This action adds a new BART';
  }

  loadSummary() {
    console.log('DEPRECATED bart.service.loadSummary()');
    return new Promise((resolve, reject) => {
      const path = `./apps/nest-demo/src/app/bart/summary.txt`;
      fs.readFile(path, 'utf-8', (err, file) => {
        if (err) {
          reject(err);
        }
        console.log('DEPRECATED: loadSummary', file);
        if (file) {
          resolve(file);
        } else {
          reject('DEPRECATED: none found');
        }
      });
    });
  }

  loadSummaryById(summaryUrl: string) {
    const summaryFilename = encodeURIComponent(summaryUrl);
    console.log('bart.service.loadSummaryById:', summaryUrl);
    return new Promise((resolve, reject) => {
      const path = `./apps/nest-demo/src/app/bart/summaries/${summaryFilename}.txt`;
      fs.readFile(path, 'utf-8', (err, file) => {
        if (err) {
          reject(err);
        }
        console.log('loadSummaryById.loadSummary', file);
        if (file) {
          resolve(file);
        } else {
          reject('none found');
        }
      });
    });
  }

  findOne(id: string) {
    console.log('findOne not used');
    const process = spawn('python', ['apps/hugging-face/src/bart.py', id]);
    return new Promise((resolve, reject) => {
      process.stdout.on('data', function (data) {
        resolve(data.toString());
      });
      process.stderr.on('data', reject);
    });
  }

  async getArticleSummary(articleUrl: any) {
    const process = spawn('python', [
      'apps/hugging-face/src/goose.py',
      articleUrl,
    ]);
    return new Promise((resolve, reject) => {
      process.stdout.on('data', function (data) {
        const filename = encodeURIComponent(articleUrl);
        const path = `./apps/nest-demo/src/app/bart/summaries/${filename}.txt`;
        console.log('bart.service.getArticleSummary: path', path);
        const file = fs.createWriteStream(path);
        file.on('error', function (err) {
          /* error handling */
          console.log('process err', err);
        });
        file.write(data.toString());
        file.end();
        resolve(data.toString());
      });
      process.stderr.on('data', reject);
    }).catch((err) => {
      const buf = Buffer.from(err);
      console.log('bart.service getArticleSummary service err', buf.toString());
      return throwError(buf.toString());
    });
  }

  faceHugger(articleText: string) {
    console.log('faceHugger');
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
