import { Component , Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IcartItem } from '../../shared/model/cart';

@Component({
  selector: 'app-cart-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart-details.component.html',
  styleUrls: ['./cart-details.component.scss']
})
export class CartDetailsComponent {
  @Input() items: IcartItem[] = [];

  incrementItemQuantity(item: IcartItem){

  }
  decrementItemQuantity(item: IcartItem){

  }
  removeItemFromCart(item: IcartItem){
    
  }
}