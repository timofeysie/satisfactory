import { Injectable } from '@nestjs/common';
import { CreateTrendDto } from './dto/create-trend.dto';
import { UpdateTrendDto } from './dto/update-trend.dto';
import * as googleTrends from 'google-trends-api';
import * as fs from 'fs';

@Injectable()
export class TrendsService {
  create(createTrendDto: any) {
    const file = fs.createWriteStream('posts/post.json');
    file.on('error', function (err) {
      /* error handling */
    });
    file.write(JSON.stringify(createTrendDto));
    file.end();
    return 'This action adds a new trend';
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
