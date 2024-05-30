import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pagination } from '../shared/model/pagination';
import { Iproduct } from '../shared/model/products';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ShopService {

  constructor(private http: HttpClient) { }

  getProducts() {
    return this.http.get<Pagination<Iproduct[]>>(environment.apiUrl + 'shop/products');
  }
}
