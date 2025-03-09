import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../Service/product.service';
import { Iproduct } from '../interface/Iproduct';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss'],
  animations: [
    trigger('colorAnimation', [
      state('selected', style({
        transform: 'scale(1.1)', 
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)'
      })),
      state('notSelected', style({
        transform: 'scale(1)',
        boxShadow: 'none'
      })),
      transition('notSelected => selected', animate('200ms ease-in')),
      transition('selected => notSelected', animate('200ms ease-out'))
    ])
  ]
})
export class ShopComponent implements OnInit {
  products: Iproduct[] = [];
  filteredProducts: Iproduct[] = [];
  errMsg: string | null = null;
  price: number = 0;

  colors: string[] = ['#000000', '#dc2626', '#2563eb', '#16a34a', 'yellow', '#8b5cf6', 'orange'];
  additionalColors: string[] = ['skyblue', 'palevioletred', 'white'];
  selectedColor: string | null = null;

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe({
      next: (data) => {
        this.products = data;
        this.filteredProducts = data;
      },
      error: (err) => {
        this.errMsg = err;
        console.error('Error loading products:', err);
      },
    });
  }

  updatePrice(event: Event): void {
    const target = event.target as HTMLInputElement;
    const value = parseFloat(target.value);
    this.price = 1000 - (value * 200);
  }

  selectColor(color: string): void {
    this.selectedColor = this.selectedColor === color ? null : color;
  }

  getAnimationState(color: string): string {
    return this.selectedColor === color ? 'selected' : 'notSelected';
  }
}