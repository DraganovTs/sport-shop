import { Component, OnInit } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { Iproduct } from '../shared/model/products';
import { ShopService } from './shop.service';
import { CommonModule } from '@angular/common'; 
import { HttpClient } from '@angular/common/http';
import { ProductItemComponent } from './product-item/product-item.component';

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

  constructor(private shopService: ShopService) {}

  ngOnInit(): void {
    this.shopService.getProducts().subscribe({
      next: response => this.products = response.productList,
      error: error => console.log(error)
    });
  }
}
