import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { NxModule } from '@nrwl/nx';
import { RouterModule } from '@angular/router';
import { authRoutes, AuthModule } from '@demo-app/auth';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // Added
import { LayoutModule } from '@demo-app/layout';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NxModule.forRoot(),
    RouterModule.forRoot(
      [
        { path: '', pathMatch: 'full', redirectTo: 'products' }, // added
        { path: 'auth', children: authRoutes },
        {
          path: 'products',
          loadChildren: () =>
            import('@demo-app/products').then(
              (mod) => mod.ProductsModule // added
            ),
        },
      ],
      {
        initialNavigation: 'enabled',
      }
    ),
    AuthModule,
    LayoutModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
