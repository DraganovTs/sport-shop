import { Component, OnInit } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { Iproduct, iCategory , iBrand } from '../shared/model/products';
import { ShopService } from './shop.service';
import { CommonModule } from '@angular/common'; 
import { HttpClient } from '@angular/common/http';
import { ProductItemComponent } from './product-item/product-item.component';
import { response } from 'express';
import { error } from 'console';
import { ShopParams } from '../shared/model/shopparams';

@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule ,
    ProductItemComponent
  ],
  providers: [
    ShopService, 
    HttpClient 
  ],
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {
  products: Iproduct[] = [];
  categories: iCategory[] = [];
  brands: iBrand[] = [];
  shopParams: ShopParams;

  constructor(private shopService: ShopService) {
    this.shopParams = this.shopService.getShopParams();
  }

  ngOnInit(): void {
    this.getProducts();
    this.getCategories();
    this.getBrands();
  }

getCategories(){
  this.shopService.getCategories().subscribe({
    next: response => {
      console.log(response);
      this.categories = [{categoryId: 0, categoryName: 'All'}, ...response]
    },
    error:error => console.log(error)
  })
}

getProducts(){
  this.shopService.getProducts().subscribe({
    next: response => this.products = response.productList,
    error: error => console.log(error)
  });
}

getBrands(){
  this.shopService.getBrands().subscribe({
    next: response => {
      console.log(response);
      this.brands = [{brandId: 0, brandName: 'All'}, ...response]
    },
    error:error => console.log(error)
  })
}

onBrandSelected(brandId: number){
  const params = this.shopService.getShopParams();
  params.brandId = brandId;
  this.shopService.setShopParams(params);
  this.shopParams = params;
  this.getProducts();
}
onCategorySelected(categoryId: number){
  const params = this.shopService.getShopParams();
  params.categoryId = categoryId;
  this.shopService.setShopParams(params);
  this.shopParams = params;
  this.getProducts();
}

}
