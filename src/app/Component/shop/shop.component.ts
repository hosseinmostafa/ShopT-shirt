import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../Service/product.service';
import { Iproduct } from '../interface/Iproduct';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { Router } from '@angular/router';
import { CartService } from '../../Service/cart.service';
import { WhatchlaterHarteService } from '../../Service/whatchlater-harte.service';

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


  selectedColor: string | null = null;

  selectedCategories: string[] = [];
  selectedPriceRange: number = 0;
  selectedRating: number | null = null;
  isFilterOpen: boolean = false;

  selectedSize: string | null = null;


  constructor(private productService: ProductService, private watchlater: WhatchlaterHarteService, private router: Router, private cartService: CartService) { }

  ngOnInit(): void {
    this.loadProducts();
    this.watchlater.getImages().subscribe((data: any) => {
      this.products = Object.keys(data).map(key => data[key]);
    });
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe({
      next: (data) => {
        this.products = data;
        this.filteredProducts = data; 
        console.log('Products Loaded:', this.products); 
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
  selectedStyle: string | null = null;
  applyFilters(): void {
    this.filteredProducts = this.products.filter(product => {
      const matchesType = this.selectedCategories.length === 0 ||
        (product.type && this.selectedCategories.some(cat =>
          product.type.toLowerCase() === cat.toLowerCase()));

      const matchesPrice = this.selectedPriceRange === 0 ||
        (product.price && product.price <= this.selectedPriceRange);

      const matchesSize = !this.selectedSize ||
        (product.sizes && product.sizes.includes(this.selectedSize));

      const matchesStyle = !this.selectedStyle ||
        (product.style && product.style.toLowerCase() === this.selectedStyle.toLowerCase());

      return matchesType && matchesPrice && matchesSize && matchesStyle;
    });

    this.isFilterOpen = false; 
  }
  selectStyle(style: string): void {
    this.selectedStyle = this.selectedStyle === style ? null : style;
  }
  selectSize(size: string): void {
    this.selectedSize = this.selectedSize === size ? null : size;
  }


  // Product-details
  getOneProduct(id: string): void {
    this.router.navigate(['/product', id]);

  }

  // Filter open small
  toggleFilter() {
    this.isFilterOpen = !this.isFilterOpen;
  }
  

  addToCart(product: Iproduct): void {
    this.cartService.addToCart(product);
  }

  saveImage(product: any): void {
    this.watchlater.saveImage(product);
  }

  filterByCategory(category: string): void {
    if (category === 'All') {
      this.filteredProducts = this.products;
    } else {
      this.filteredProducts = this.products.filter(product => {
        if (product.category && Array.isArray(product.category)) {
          return product.category.some(cat => cat.toLowerCase() === category.toLowerCase());
        }
        return false;
      });
    }
    console.log('Filtered Products:', this.filteredProducts);
  }
}


