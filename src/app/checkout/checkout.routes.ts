import { Routes } from '@angular/router';
import { CheckoutComponent } from './checkout.component';
import { AuthGuard } from '../auth/auth.guard';
 

  
 
export const CHECKOUT_ROUTES: Routes = [
    { path: '', component: CheckoutComponent, canActivate:[AuthGuard], data:{roles: ['USER']} },
    
  ];