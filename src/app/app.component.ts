import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { ShopComponent } from './shop/shop.component';
import { CartService } from './shop/cart/cart.service '
import { BehaviorSubject, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NavBarComponent, ShopComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  pageTitle: string = 'Welcome to my new online sport shop';


  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.loadCart();
    this.demoSubject();
  }

  private loadCart(): void {
    const cartId = localStorage.getItem('angular_cart_id');
    if (cartId) {
      this.cartService.getCart(cartId).subscribe({
        next: response => {
          if (response) {
            console.log('Cart Initialized');
            console.log(response);
          } else {
            console.log('Cart not found');
          }
        },
        error: (error: any) => console.log(error)
      });
    }
  }

  private demoSubject(): void {
    // const subject = new Subject<number>();
    // subject.subscribe({
    //   next: data => console.log(`Observer A receives: ${data}`)
    // });
    // subject.subscribe({
    //   next: data => console.log(`Observer B receives: ${data}`)
    // });

    // subject.next(10);
    // subject.next(20);
    // subject.subscribe({
    //   next: data => console.log(`Observer C receives: ${data}`)
    // });

    const bs = new BehaviorSubject(50);
  bs.subscribe({
      next: data => console.log(`Observer A receives: ${data}`)
    });
    bs.subscribe({
      next: data => console.log(`Observer B receives: ${data}`)
    });
    bs.next(10);
    bs.next(20);

    bs.subscribe({
      next: data => console.log(`Observer C receives: ${data}`)
    });
    bs.next(30);
    console.log(bs.value)
  }
}