import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../../Service/product.service';
import { Iproduct } from '../interface/Iproduct';
import { CartService } from '../../Service/cart.service';
import { WhatchlaterHarteService } from '../../Service/whatchlater-harte.service';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [
    trigger('countAnimation', [
      state('start', style({
        opacity: 0,
        transform: 'translateY(-50px)'
      })),
      state('end', style({
        opacity: 1,
        transform: 'translateY(0)'
      })),
      transition('start => end', animate('500ms ease-out')),
      transition('end => start', animate('500ms ease-in'))
    ])
  ]
})
export class HomeComponent implements OnInit {
  brandCount1: number = 0;
  brandCount2: number = 0;
  brandCount3: number = 0;
  products: Iproduct[] = [];
  filteredProducts: Iproduct[] = [];
  errMsg: string | null = null;
  price: number = 0;
  displayedProducts: Iproduct[] = [];

  selectedColor: string | null = null;
  selectedCategories: string[] = [];
  selectedPriceRange: number = 0;
  selectedRating: number | null = null;
  isFilterOpen: boolean = false;

  constructor(
    private router: Router,
    private watchlater: WhatchlaterHarteService,
    private productService: ProductService,
    private cartService: CartService
  ) { }

  ngOnInit(): void {
    this.startCounters();
    this.loadProductsHome();
  }

  startCounters(): void {
    this.animateValue(0, 100, 2000, (value) => (this.brandCount1 = value));
    this.animateValue(0, 400, 2000, (value) => (this.brandCount2 = value));
    this.animateValue(0, 90, 2000, (value) => (this.brandCount3 = value));
  }

  animateValue(start: number, end: number, duration: number, callback: (value: number) => void): void {
    let startTimestamp: number | null = null;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const value = Math.floor(progress * (end - start) + start);
      callback(value);
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }

  showAlert: boolean = true;

  hideMessage(): void {
    this.showAlert = false;
    document.querySelector('.navbar')?.classList.add('no-alert');
    document.querySelector('body')?.classList.add('no-alert');
    document.querySelector('.home-page')?.classList.add('no-alert');
  }

  getOneProductHome(id: string): void {
    this.router.navigate(['/product', id]);
  }

  loadProductsHome(): void {
    this.productService.getProductsHome().subscribe({
      next: (data) => {
        this.products = data;
        this.selectRandomProducts(4);
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

  selectRandomProducts(count: number): void {
    const shuffled = this.products.sort(() => 0.5 - Math.random());
    this.displayedProducts = shuffled.slice(0, count);
  }

  addToCart(product: Iproduct): void {
    this.cartService.addToCart(product);
  }

  saveImage(product: Iproduct): void {
    this.watchlater.saveImage(product);
  }
}