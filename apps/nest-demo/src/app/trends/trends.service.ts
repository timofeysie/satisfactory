import { Injectable } from '@nestjs/common';
import { CreateTrendDto } from './dto/create-trend.dto';
import { UpdateTrendDto } from './dto/update-trend.dto';
import * as googleTrends from 'google-trends-api';
import * as fs from 'fs';

@Injectable()
export class TrendsService {
  async create(createTrendDto: any) {
    console.log('TrendsService.create: createTrendDto', createTrendDto.pageTitle);
    await this.getGeneratedFileName(createTrendDto);
    const fileName = createTrendDto.pageTitle?.split(' ').join('-');
    if (fileName) {
      const file = fs.createWriteStream(`posts/${fileName}.json`);
      file.on('TrendsService.create: error', function (err) {
        /* error handling */
        console.log('TrendsService.create: err 1', err);
      });
      console.log(fileName,'writing', createTrendDto.length);
      file.write(JSON.stringify(createTrendDto));
      file.end();
      
      return 'This action adds a new trend';
    } else {
      console.log('TrendsService.create: no pageTitle');
      return 'no pageTitle';
    }
  }

  /**
   * Load the s3 file bucket info for AI generated images
   * TODO: needs to be modified if we want two images created by AIs.
   * @param createTrendDto form
   * @returns 
   */
  async getGeneratedFileName(createTrendDto) {
    const title1 = this.findTitle('one', createTrendDto);
    if (title1) {
      const oneS3 = await this.writeBucketFile(title1);
      if (oneS3) createTrendDto.one.s3 = oneS3;
    }
    // const title2 = await this.findTitle('two', createTrendDto);
    // if (title2) {
    //   const twoS3 = this.writeBucketFile(title2);
    //   createTrendDto.two.s3 = twoS3;
    // }
  }

  async writeBucketFile(fileTitle) {
    const path = `./apps/nest-demo/src/app/gan/bucket/${fileTitle}.json`;
    // Check that the file exists locally
    if (!fs.existsSync(path)) {
      console.log('writeBucketFile: File not found', path);
      return null;
    }
    const s3file = JSON.parse(fs.readFileSync(path, 'utf-8'));
    return s3file;
  }

  /**
   * Find the image chose which represents an s3 bucket file path.
   * @param pictureNumber one or two
   * @param createTrendDto the form
   * @returns
   */
  findTitle(pictureNumber, createTrendDto) {
    if (createTrendDto[pictureNumber].type === 'AI') {
      return createTrendDto[pictureNumber].imageChosen;
    }
  }

  findAll() {
    return googleTrends.dailyTrends(
      {
        trendDate: new Date(),
        geo: 'US',
      },
      function (err, results) {
        if (err) {
          return err;
        } else {
          const defaultObj = JSON.parse(Object(results)).default
            .trendingSearchesDays[0].trendingSearches;
          return defaultObj;
        }
      }
    );
  }

  findOne(id: string) {
    return googleTrends.dailyTrends(
      {
        trendDate: new Date(),
        geo: id,
      },
      function (err, results) {
        if (err) {
          console.log('err', err);
          return err;
        } else {
          const defaultObj = JSON.parse(Object(results)).default
            .trendingSearchesDays[0].trendingSearches;
          return defaultObj;
        }
      }
    );
  }

  update(id: number, updateTrendDto: UpdateTrendDto) {
    return `This action updates a #${id} trend`;
  }

  remove(id: number) {
    return `This action removes a #${id} trend`;
  }
}
