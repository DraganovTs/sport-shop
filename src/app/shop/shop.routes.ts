import { Routes } from '@angular/router';
import { ShopComponent } from './shop.component';

export const SHOP_ROUTES: Routes = [
    { path: '', component: ShopComponent },
   /*  {
        path: ':id',
        canActivate: [ProductDetailGuard],
        component: ProductDetailComponent
    } */
  ];
