import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';
import { PicturesComponent } from './containers/pictures/pictures.component';

export const picturesRoutes: Route[] = [];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: PicturesComponent }]),
  ],
  declarations: [PicturesComponent],
})
export class PicturesModule {}
