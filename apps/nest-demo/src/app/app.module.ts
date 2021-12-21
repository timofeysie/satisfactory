import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoginModule } from './login/login.module';
import { TrendsModule } from './trends/trends.module';
import { ImagesModule } from './images/images.module';
import { TextModule } from './text/text.module';
import { ProductsModule } from './products/products.module';

@Module({
  imports: [LoginModule, TrendsModule, ImagesModule, TextModule, ProductsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
