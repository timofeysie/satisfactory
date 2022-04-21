import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ProductsComponent } from './containers/products/products.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import {
  productsReducer,
  initialState as productsInitialState,
} from './+state/products.reducer';
import { ProductsEffects } from './+state/products.effects';
import { ProductListComponent } from './containers/product-list/product-list.component';
import { MaterialModule } from '@demo-app/material';
import { ProductDetailComponent } from './containers/product-detail/product-detail.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DetailFormComponent } from './containers/detail-form/detail-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ArticleListComponent } from './components/article-list/article-list.component';
import { DetailLinksComponent } from './components/detail-links/article-list.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([{ path: '', component: ProductsComponent }]),
    StoreModule.forFeature('products', productsReducer, {
      initialState: productsInitialState,
    }),
    EffectsModule.forFeature([ProductsEffects]),
  ],
  declarations: [
    ProductsComponent,
    ProductListComponent,
    ProductDetailComponent,
    DetailFormComponent,
    ArticleListComponent,
    DetailLinksComponent,
  ],
  providers: [ProductsEffects],
})
export class ProductsModule {}
