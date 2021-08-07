import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TrendsComponent } from './containers/trends/trends.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromTrends from './+state/trends.reducer';
import { TrendsEffects } from './+state/trends.effects';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', pathMatch: 'full', component: TrendsComponent },
    ]),
    StoreModule.forFeature(fromTrends.TRENDS_FEATURE_KEY, fromTrends.reducer),
    EffectsModule.forFeature([TrendsEffects]),
  ],
  declarations: [TrendsComponent],
})
export class TrendsModule {}
