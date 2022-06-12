import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
export { Authenticate } from './authenticate';
export { User } from './user';
export { Product } from './product';
export { Trend } from './trend';
export { Geo } from './geo';
export { Selector } from './selector';

@NgModule({
  imports: [CommonModule],
})
export class DataModelsModule {}
