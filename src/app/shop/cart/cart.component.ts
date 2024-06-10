import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ICart, IcartItem, IcartTotals } from '../../shared/model/cart';
import { CartService } from '../cart/cart.service ';
import { CartDetailsComponent } from '../../core/cart-details/cart-details.component';
import { RouterModule } from '@angular/router';  // Import RouterModule for routing

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterModule, CartDetailsComponent],  // Import RouterModule
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit {
  cart$: Observable<ICart | null> = new Observable<ICart | null>();
  cartTotals$: Observable<IcartTotals | null> = new Observable<IcartTotals | null>();

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cart$ = this.cartService.cart$;
    this.cartTotals$ = this.cartService.cartTotals$;
  }

  incrementItemQuantity(item: IcartItem) {
    this.cartService.incrementItemQuantity(item);
  }

  decrementItemQuantity(item: IcartItem) {
    this.cartService.decrementItemQuantity(item);
  }

  removeItemFromCart(item: IcartItem) {
    this.cartService.removeItemFromCart(item);
  }
}
