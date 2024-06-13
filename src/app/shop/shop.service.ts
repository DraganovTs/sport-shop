import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pagination } from '../shared/model/pagination';
import { Iproduct, iBrand, iCategory } from '../shared/model/product';
import { environment } from '../../environments/environment';
import { ShopParams } from '../shared/model/shopparams';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShopService {

  shopParams = new ShopParams();

  constructor(private http: HttpClient) { }
  pagination?: Pagination<Iproduct[]>;

  getProducts() : Observable<Pagination<Iproduct[]>> {
    let params = new HttpParams();
    console.log("page size:");
    console.log(this.shopParams.pageSize);
    if(this.shopParams.brandId > 0) params = params.append('brandId', this.shopParams.brandId);
    if(this.shopParams.categoryId > 0) params = params.append('categoryId', this.shopParams.categoryId);
    params = params.append('sort', this.shopParams.sort);
    
    params = params.append('pageIndex', this.shopParams.pageIndex);
   // if(this.shopParams?.pageSize === 'undefined')  this.shopParams.pageSize=environment.pageSize;
    params = params.append('pageSize', environment.pageSize);
    if(this.shopParams.search) params = params.append('search',this.shopParams.search.trim());

    return this.http.get<Pagination<Iproduct[]>>(environment.apiUrl +'shop/products', {params}).pipe(
    
      map(response => {
         this.pagination= response;
         console.log(response);
          return response;
        
      })
    );
  }

  
  getCategories() {
    return this.http.get<iCategory[]>(environment.apiUrl +'shop/categories');
  }
  getBrands() {
    return this.http.get<iBrand[]>(environment.apiUrl +'shop/brands');
  }

  setShopParams(params: ShopParams) {
    this.shopParams = params;
  }
  getShopParams() {
    return this.shopParams;
  }
}
