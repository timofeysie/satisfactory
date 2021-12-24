import { Injectable } from '@nestjs/common';

@Injectable()
export class GeneratorService {
  private dataSet: string[];

  constructor() {
    this.dataSet = [];
  }

  setData(data: string[]) {
    data.forEach((part) => {
      if (!this.dataSet.includes(part)) {
        this.dataSet.push(part);
        console.log(part);
      } else {
        // console.log('no adding repeat');
      }
    })
  }

  getData() {
    return this.dataSet;
  }
}
