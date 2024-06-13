import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarouselConfig, CarouselModule } from 'ngx-bootstrap/carousel';
import { NgModule } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, CarouselModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  providers: [
    { provide: CarouselConfig, useValue: { interval: 1500, noPause: false, showIndicators: true } }
 ],
})
export class HomeComponent {
  /*  slides = [
     {image: 'assets/images/image1.jpg', text: 'First'},
     {image: 'assets/images/image2.jpg',text: 'Second'},
     {image: 'assets/images/image3.jpg',text: 'Third'}
  ];
  noWrapSlides = false;
  showIndicator = true; */
  constructor() { }
 }
