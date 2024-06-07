import { Component } from '@angular/core';
import { CartService } from '../shop/cart/cart.service ';
import { Observable } from 'rxjs';
import { ICart } from '../shared/model/cart';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss'
})
export class NavBarComponent {

  cart$: Observable<ICart | null>;
    constructor(public cartService: CartService){
     this.cart$ = this.cartService.cart$;
  }
}
