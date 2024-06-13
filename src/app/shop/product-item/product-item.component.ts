import { Component, Input } from '@angular/core';
import { Iproduct } from '../../shared/model/product';
import { CommonModule } from '@angular/common';
import { CartService } from '../../cart/cart.service ';

@Component({
  selector: 'app-product-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-item.component.html',
  styleUrl: './product-item.component.scss'
})
export class ProductItemComponent {
  @Input() product?: Iproduct;

  constructor(private cartService: CartService) {

  }
  addItemToCart() {
    this.product&&this.cartService.addItemToCart(this.product);
  }
}
