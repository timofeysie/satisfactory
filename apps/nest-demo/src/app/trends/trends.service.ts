import { Injectable } from '@nestjs/common';
import { CreateTrendDto } from './dto/create-trend.dto';
import { UpdateTrendDto } from './dto/update-trend.dto';
import * as googleTrends from 'google-trends-api';

@Injectable()
export class TrendsService {
  create(createTrendDto: CreateTrendDto) {
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

  findOne(id: number) {
    return `This action returns a #${id} trend`;
  }

  update(id: number, updateTrendDto: UpdateTrendDto) {
    return `This action updates a #${id} trend`;
  }

  remove(id: number) {
    return `This action removes a #${id} trend`;
  }
}
