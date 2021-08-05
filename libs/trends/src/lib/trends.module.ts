import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TrendsComponent } from './containers/trends/trends.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', pathMatch: 'full', component: TrendsComponent },
    ]),
  ],
  declarations: [TrendsComponent],
})
export class TrendsModule {}
