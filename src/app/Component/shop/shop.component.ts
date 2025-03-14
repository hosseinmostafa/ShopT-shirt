import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../Service/product.service';
import { Iproduct } from '../interface/Iproduct';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss'],
  
})
export class ShopComponent implements OnInit {
  
  products: Iproduct[] = [];
  filteredProducts: Iproduct[] = [];
  errMsg: string | null = null;
  price: number = 0;

  colors: string[] = ['#000000', '#dc2626', '#2563eb', '#16a34a', 'yellow', '#8b5cf6', 'orange'];
  additionalColors: string[] = ['skyblue', 'palevioletred', 'white'];
  selectedColor: string | null = null;

  selectedCategories: string[] = []; 
  selectedPriceRange: number = 0; 
  selectedRating: number | null = null; 

  constructor(private productService: ProductService, private router: Router) { }

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
    this.selectedPriceRange = parseFloat(target.value);
  }

  selectColor(color: string): void {
    this.selectedColor = this.selectedColor === color ? null : color;
  }

  toggleCategory(category: string): void {
    if (this.selectedCategories.includes(category)) {
      this.selectedCategories = this.selectedCategories.filter(cat => cat !== category);
    } else {
      this.selectedCategories.push(category);
    }
  }

  selectRating(rating: number): void {
    this.selectedRating = rating;
  }

  // fillte
  applyFilters(): void {
    this.filteredProducts = this.products.filter(product => {
      const matchesCategory = this.selectedCategories.length === 0 ||
        this.selectedCategories.includes(product.category[0]);
      const matchesColor = this.selectedColor ? product.color[0] === this.selectedColor : true;
      const matchesPrice = product.price <= this.selectedPriceRange;
      const matchesRating = this.selectedRating ? product.rating >= this.selectedRating : true;
      return matchesCategory || matchesColor || matchesPrice || matchesRating;
    });
  }

  getAnimationState(color: string): string {
    return this.selectedColor === color ? 'selected' : 'notSelected';
  }

  // Product-details
  goToProductDetails(id: string): void {
    this.router.navigate(['/product', id]);
    
  }
}

