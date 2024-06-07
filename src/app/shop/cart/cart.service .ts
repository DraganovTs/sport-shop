import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Cart, ICart, IcartItem, IcartTotals } from '../../shared/model/cart';
import { environment } from '../../../environments/environment';
import { Iproduct } from '../../shared/model/products';

@Injectable({
  providedIn: 'root'
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
    localStorage.setItem('angular_cart_id', cart.id);
    return cart;
  }

  getCurrentCart() {
    return this.cartSource.value;
  }

  private calculateTotals() {
    const cart = this.getCurrentCart();
    if (!cart) return;
    const shipping = cart.shippingPrice;
    const subtotal = cart.items.reduce((a, b) => b.price * b.quantity + a, 0);
    const total = subtotal + shipping;
    this.cartTotalSource.next({ shipping, total, subtotal });
  }

  getCart(id: string): Observable<Cart> {
    return this.http.get<ICart>("http://localhost:8080/v1/sport/cart/"+`${id}`).pipe(
      map((cart: ICart) => {
        this.cartSource.next(cart);
        this.calculateTotals();
        return cart;
      })
    );
  }

  setCart(cart: ICart) {
    return this.http.post<ICart>(this.shoppingCartUrl, cart).subscribe({
      next: (response: ICart) => {
        this.cartSource.next(response);
        this.calculateTotals();
      },
      error: (error) => console.log(error)
    });
  }

  addItemToCart(product: Iproduct, quantity = 1) {
    const itemToAdd = this.mapProductToCartItem(product);
    const cart = this.getCurrentCart() ?? this.createCart();
    cart.items = this.addOrUpdateItem(cart.items, itemToAdd, quantity);
    this.setCart(cart);
  }

  private mapProductToCartItem(product: Iproduct): IcartItem {
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

  private addOrUpdateItem(items: IcartItem[], item: IcartItem, quantity: number): IcartItem[] {
    const itemFound = items.find(i => i.productId === item.productId);
    if (itemFound) {
      itemFound.quantity += quantity;
    } else {
      item.quantity = quantity;
      items.push(item);
    }
    return items;
  }

  incrementItemQuantity(item: IcartItem) {
    const cart = this.getCurrentCart();
    if (cart) {
      const foundItemIndex = cart.items.findIndex(i => i.productId === item.productId);
      if (foundItemIndex !== -1) {
        cart.items[foundItemIndex].quantity++;
        this.setCart(cart);
      }
    }
  }

  decrementItemQuantity(item: IcartItem) {
    const cart = this.getCurrentCart();
    if (cart) {
      const foundItemIndex = cart.items.findIndex(i => i.productId === item.productId);
      if (foundItemIndex !== -1) {
        if (cart.items[foundItemIndex].quantity > 1) {
          cart.items[foundItemIndex].quantity--;
          this.setCart(cart);
        } else {
          this.removeItemFromCart(item);
        }
      }
    }
  }

  removeItemFromCart(item: IcartItem) {
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

  deleteCart(cart: ICart) {
    return this.http.delete(`${this.shoppingCartUrl}/${cart.id}`, { responseType: 'text' }).subscribe({
      next: () => {
        this.cartSource.next(null);
        this.cartTotalSource.next(null);
        localStorage.removeItem('angular_cart_id');
      },
      error: (error) => console.log(error)
    });
  }
}
