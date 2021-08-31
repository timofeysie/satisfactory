import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { PicturesModule, picturesRoutes } from '@demo-app/pictures';
import { TrendyLayoutModule } from '@demo-app/trendy-layout';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    RouterModule.forRoot(
      [
        { path: '', children: picturesRoutes },
        { path: 'pictures', children: picturesRoutes },
      ],
      {
        initialNavigation: 'enabled',
      }
    ),
    BrowserAnimationsModule,
    TrendyLayoutModule,
    PicturesModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
