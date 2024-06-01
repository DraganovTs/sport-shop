import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pagination } from '../shared/model/pagination';
import { Iproduct, iBrand, iCategory } from '../shared/model/products';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ShopService {

  constructor(private http: HttpClient) { }

  getProducts() {
    return this.http.get<Pagination<Iproduct[]>>(environment.apiUrl + 'shop/products');
  }

  
  getCategories() {
    return this.http.get<iCategory[]>(environment.apiUrl + 'shop/categories');
  }

  
  getBrands() {
    return this.http.get<iBrand[]>(environment.apiUrl + 'shop/brands');
  }
}
