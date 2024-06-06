import { Injectable } from '@angular/core';
import { Cart, ICart, IcartItem, IcartTotals } from '../../shared/model/cart'; 
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Iproduct } from '../../shared/model/products';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cart: Cart = new Cart();
  private cartSource = new BehaviorSubject<ICart | null>(null);
  cart$ = this.cartSource.asObservable();
  private cartTotalSource = new BehaviorSubject<IcartTotals | null>(null);
  cartTotals$ = this.cartTotalSource.asObservable();
  shoppingCartUrl = environment.apiShoppingCartUrl;

  constructor(private http: HttpClient) {}

  createCart(): Cart {
    const cart = new Cart();
    localStorage.setItem("angular_cart_id", cart.id);
    return cart;
  }

  getCurrentCart(): ICart | null {
    return this.cartSource.value;
  }

  private calculateTotals(): void {
    const cart = this.getCurrentCart();
    if (!cart) return;
    const shipping = cart.shippingPrice;
    const subtotal = cart.items.reduce((a, b) => (b.price * b.quantity) + a, 0);
    const total = subtotal + shipping;
    this.cartTotalSource.next({ shipping, total, subtotal });
  }

  getCart(id: string): Observable<void> {
    return this.http.get<ICart>(`${this.shoppingCartUrl}/${id}`).pipe(
      map((cart: ICart) => {
        this.cartSource.next(cart);
        this.calculateTotals();
      }),
      catchError(error => {
        console.error(error);
        return of();
      })
    );
  }

  setCart(cart: ICart): void {
    this.http.post<ICart>(this.shoppingCartUrl, cart).subscribe({
      next: (response: ICart) => {
        this.cartSource.next(response);
        this.calculateTotals();
      },
      error: error => {
        console.error(error);
      }
    });
  }

  addItemToCart(product: Iproduct, quantity = 1): void {
    const itemToAdd = this.mapProductToCartItem(product);
    const cart = this.getCurrentCart() ?? this.createCart();
    cart.items = this.addOrUpdateItem(cart.items, itemToAdd, quantity);
    this.setCart(cart);
  }

  mapProductToCartItem(product: Iproduct): IcartItem {
    return {
      productId: product.productId,
      title: product.title,
      price: product.price,
      quantity: 1,
      imageUrl: product.imageUrl,
      brandName: product.brandName,
      categoryName: product.categoryName
    };
  }

  addOrUpdateItem(items: IcartItem[], item: IcartItem, quantity: number): IcartItem[] {
    const itemFound = items.find(i => i.productId === item.productId);
    if (itemFound) {
      itemFound.quantity += quantity;
    } else {
      item.quantity = quantity;
      items.push(item);
    }
    return items;
  }

  incrementItemQuantity(item: IcartItem): void {
    const cart = this.getCurrentCart();
    if (cart) {
      const foundItemIndex = cart.items.findIndex(i => i.productId === item.productId);
      cart.items[foundItemIndex].quantity++;
      this.setCart(cart);
    }
  }

  decrementItemQuantity(item: IcartItem): void {
    const cart = this.getCurrentCart();
    if (cart) {
      const foundItemIndex = cart.items.findIndex(i => i.productId === item.productId);
      if (cart.items[foundItemIndex].quantity > 1) {
        cart.items[foundItemIndex].quantity--;
        this.setCart(cart);
      } else {
        this.removeItemFromCart(item);
      }
    }
  }

  removeItemFromCart(item: IcartItem): void {
    const cart = this.getCurrentCart();
    if (cart && cart.items.some(i => i.productId === item.productId)) {
      cart.items = cart.items.filter(i => i.productId !== item.productId);
      if (cart.items.length > 0) {
        this.setCart(cart);
      } else {
        this.deleteCart(cart);
      }
    }
  }

  deleteCart(cart: ICart): void {
    this.http.delete(`${this.shoppingCartUrl}/${cart.id}`, { responseType: 'text' }).subscribe({
      next: () => {
        this.cartSource.next(null);
        this.cartTotalSource.next(null);
        localStorage.removeItem('angular_cart_id');
      },
      error: error => {
        console.error(error);
      }
    });
  }
}
