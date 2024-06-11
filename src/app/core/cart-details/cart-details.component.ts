import { Component , Input, Output ,EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IcartItem } from '../../shared/model/cart';


@Component({
  selector: 'app-cart-details',
  standalone: true,
  imports: [CommonModule , CartDetailsComponent],
  templateUrl: './cart-details.component.html',
  styleUrls: ['./cart-details.component.scss']
})
export class CartDetailsComponent {
  @Input() items: IcartItem[] = [];
  @Output() increment: EventEmitter<IcartItem> = new EventEmitter<IcartItem>();
  @Output() decrement: EventEmitter<IcartItem> = new EventEmitter<IcartItem>();
  @Output() remove: EventEmitter<IcartItem> = new EventEmitter<IcartItem>();

  incrementItemQuantity(item: IcartItem){
      this.increment.emit(item);
  }
  decrementItemQuantity(item: IcartItem){
    this.decrement.emit(item);
  }
  removeCartItem(item: IcartItem){
    this.remove.emit(item);
  }
}