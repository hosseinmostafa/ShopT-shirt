import { Component } from '@angular/core';
import { throwError } from 'rxjs';
import { ProductService } from '../../Service/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Iproduct } from '../interface/Iproduct';
import { CartService } from '../../Service/cart.service';
import { WhatchlaterHarteService } from '../../Service/whatchlater-harte.service';

@Component({
  selector: 'app-home-product-details',
  templateUrl: './home-product-details.component.html',
  styleUrl: './home-product-details.component.scss'
})
export class HomeProductDetailsComponent {
  bigImgSrc: string = '';
  oneProduct: any;
  productId: any;
  errMsg: any;

  products: Iproduct[] = [];
  filteredProducts: Iproduct[] = [];
  errMsgProduct: string | null = null;
  price: number = 0;

  colors: string[] = ['#000000', '#dc2626', '#2563eb', '#16a34a', 'yellow', '#8b5cf6', 'orange'];
  additionalColors: string[] = ['skyblue', 'palevioletred', 'white'];
  selectedColor: string | null = null;

  selectedCategories: string[] = [];
  selectedPriceRange: number = 0;
  selectedRating: number | null = null;

  mainImage: string = '';

  constructor(
    private productService: ProductService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private cartService: CartService,
    private watchlater: WhatchlaterHarteService
  ) { }


  changeMainImage(image: string): void {
    this.mainImage = image;
  }

  ngOnInit(): void {
    this.productId = this.activatedRoute.snapshot.paramMap.get('id');
    if (this.productId) {
      this.productService.getOneProductHome(this.productId).subscribe({
        next: (data) => {
          this.oneProduct = data;
          if (this.oneProduct.images && this.oneProduct.images.length > 0) {
            this.mainImage = this.oneProduct.images[0];
          }
        },
        error: (err) => {
          this.errMsg = err.message || 'Product not found';
          return throwError(() => err);
        }
      });
    }
  }
  quantity: number = 1;

  increaseQuantity(): void {
    this.quantity++;
  }

  decreaseQuantity(): void {
    if (this.quantity > 1) {
      this.quantity--;
    }
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
  getOneProductHome(id: string): void {
    this.router.navigate(['/home', id]);
  }

  addToCart(): void {
    if (this.oneProduct) {
      this.cartService.addToCart(this.oneProduct);

    }
  }

  saveImage(product: any): void {
    this.watchlater.saveImage(product);
  }
}
