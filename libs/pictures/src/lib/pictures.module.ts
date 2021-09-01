import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';
import { MaterialModule } from '@demo-app/material';
import { PicturesComponent } from './containers/pictures/pictures.component';
import { MikeRichardsComponent } from './containers/pictures/trends/mike-richards/mike-richards.component';
import { ToonifyMikeRichardsComponent } from './containers/pictures/trends/mike-richards/toonify/toonify-mike-richards/toonify-mike-richards.component';
import { TransitioncatMikeRichardsComponent } from './containers/pictures/trends/mike-richards/transitioncat/transitioncat-mike-richards/transitioncat-mike-richards.component';

export const picturesRoutes: Route[] = [];

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule.forChild([
      { path: '', component: PicturesComponent },
      { path: 'home', component: PicturesComponent },
      { path: 'Mike Richards', component: MikeRichardsComponent },
    ]),
  ],
  declarations: [
    PicturesComponent,
    MikeRichardsComponent,
    ToonifyMikeRichardsComponent,
    TransitioncatMikeRichardsComponent,
  ],
})
export class PicturesModule {}
