import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
export { Authenticate } from './authenticate';
export { User } from './user';
export { Product } from './product';
export { Trend } from './trend';

@NgModule({
  imports: [CommonModule],
})
export class DataModelsModule {}
