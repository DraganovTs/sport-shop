import { Injectable } from '@angular/core';
import { Cart } from '../shared/model/cart'; 
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cart: Cart = new Cart();

  getCart(cartId: string): Observable<Cart> {
    if (this.cart.id === cartId) {
      return of(this.cart);
    } else {
      return of(null as any);
    }
  }
}
