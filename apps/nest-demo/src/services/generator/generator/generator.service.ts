import { Injectable } from '@nestjs/common';

@Injectable()
export class GeneratorService {
  setData(data: string) {
    console.log('data', data);
  }
}
