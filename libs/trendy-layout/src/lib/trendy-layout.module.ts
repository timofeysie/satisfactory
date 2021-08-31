import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@demo-app/material';    // Added
import { RouterModule } from '@angular/router';
import { TrendyLayoutComponent } from './containers/trendy-layout/trendy-layout.component';   // Added


@NgModule({
  imports: [CommonModule, MaterialModule, RouterModule],
  declarations: [TrendyLayoutComponent],
  exports: [TrendyLayoutComponent],
})
export class TrendyLayoutModule {}
