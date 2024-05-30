import { Component, OnInit } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { Iproduct } from '../shared/model/products';
import { ShopService } from './shop.service';
import { CommonModule } from '@angular/common'; // Import CommonModule for common Angular directives
import { HttpClient } from '@angular/common/http'; // Import HttpClient

@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule // Ensure HttpClientModule is imported here
  ],
  providers: [
    ShopService, // Provide ShopService here
    HttpClient // Provide HttpClient here
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
