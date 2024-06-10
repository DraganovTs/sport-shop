import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'welcome', pathMatch: 'full' },
  {
    path: 'shop',
    loadChildren: () => import('./shop/shop.routes').then(m => m.SHOP_ROUTES)
  },
  {
    path: 'cart',
    loadChildren: () => import('./shop/cart/cart.routes').then(m => m.CART_ROUTES)
  }
];
