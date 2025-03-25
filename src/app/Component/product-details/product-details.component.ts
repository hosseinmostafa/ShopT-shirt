import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../Service/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { throwError } from 'rxjs';
import { Iproduct } from '../interface/Iproduct';
import { CartService } from '../../Service/cart.service';
import { WhatchlaterHarteService } from '../../Service/whatchlater-harte.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  bigImgSrc: string = '';
  oneProduct: Iproduct | undefined;
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
  quantity: number = 1;

  savedImages: any[] = [];

  constructor(
    private productService: ProductService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private cartService: CartService,
    private watchlater: WhatchlaterHarteService,
  ) { }

  changeMainImage(image: string): void {
    this.mainImage = image;
  }

  increaseQuantity(product: Iproduct): void {
    if (product) {
      product.quantity = (product.quantity || 1) + 1;
      this.cartService.updateQuantity(product.id, product.quantity);
    }
  }

  decreaseQuantity(product: Iproduct): void {
    if (product && product.quantity && product.quantity > 1) {
      product.quantity--;
      this.cartService.updateQuantity(product.id, product.quantity);
    }
  }

  // ngOnInit(): void {
  //   this.productId = this.activatedRoute.snapshot.paramMap.get('id');
  //   if (this.productId) {
  //     const source = this.activatedRoute.snapshot.paramMap.get('source');
  //     if (source === 'home') {
  //       this.productService.getOneProductHome(this.productId).subscribe({
  //         next: (data) => {
  //           this.oneProduct = data;
  //           if (this.oneProduct) {
  //             if (!this.oneProduct.quantity) {
  //               this.oneProduct.quantity = 1;
  //             }
  //             if (this.oneProduct.images && this.oneProduct.images.length > 0) {
  //               this.mainImage = this.oneProduct.images[0];
  //             }
  //             this.oneProduct.source = 'home';
  //           }
  //         },
  //         error: (err) => {
  //           this.errMsg = err.message || 'Product not found';
  //           return throwError(() => err);
  //         }
  //       });
  //     } else {
  //       this.productService.getOneProduct(this.productId).subscribe({
  //         next: (data) => {
  //           this.oneProduct = data;
  //           if (this.oneProduct) {
  //             if (!this.oneProduct.quantity) {
  //               this.oneProduct.quantity = 1;
  //             }
  //             if (this.oneProduct.images && this.oneProduct.images.length > 0) {
  //               this.mainImage = this.oneProduct.images[0];
  //             }
  //             this.oneProduct.source = 'shop';
  //           }
  //         },
  //         error: (err) => {
  //           this.errMsg = err.message || 'Product not found';
  //           return throwError(() => err);
  //         }
  //       });
  //     }
  //   }
  //   this.loadSavedImages();
  // }

  // ngOnInit(): void {
  //   this.productId = this.activatedRoute.snapshot.paramMap.get('id');
  //   if (this.productId) {
  //     const source = this.activatedRoute.snapshot.paramMap.get('source') || 'shop';

  //     if (source === 'home') {
  //       this.productService.getOneProductHome(this.productId).subscribe({
  //         next: (data) => this.handleProductData(data, 'home'),
  //         error: (err) => this.handleError(err)
  //       });
  //     } else if (source === 'new') {
  //       this.productService.getOneNewProduct(this.productId).subscribe({
  //         next: (data) => this.handleProductData(data, 'shop'),
  //         error: (err) => this.handleError(err)
  //       });
  //     } else {
  //       this.productService.getOneProduct(this.productId).subscribe({
  //         next: (data) => this.handleProductData(data, 'shop'),
  //         error: (err) => this.handleError(err)
  //       });
  //     }
  //   }
  // }

  ngOnInit(): void {
    this.productId = this.activatedRoute.snapshot.paramMap.get('id');
    const source = this.activatedRoute.snapshot.queryParamMap.get('source');

    if (this.productId) {
      const productObservable = source === 'new'
        ? this.productService.getOneNewProduct(this.productId)
        : source === 'home'
          ? this.productService.getOneProductHome(this.productId)
          : this.productService.getOneProduct(this.productId);

      productObservable.subscribe({
        next: (data) => {
          this.oneProduct = data;
          if (this.oneProduct?.images?.length) {
            this.mainImage = this.oneProduct.images[0];
          }
        },
        error: (err) => {
          console.error('Error loading product:', err);
          this.errMsg = 'Failed to load product details';
        }
      });
    }
  }

  updatePrice(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.selectedPriceRange = parseFloat(target.value);
  }

  updateQuantity(newQuantity: number): void {
    if (this.oneProduct) {
      this.oneProduct.quantity = newQuantity;
      this.cartService.updateQuantity(this.oneProduct.id, newQuantity);
    }
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

  getOneProduct(id: string): void {
    this.router.navigate(['/product', id]);
  }

  addToCart(): void {
    if (this.oneProduct) {
      if (!this.oneProduct.quantity) {
        this.oneProduct.quantity = 1;
      }
      this.cartService.addToCart(this.oneProduct);
    }
  }

  saveImage(product: Iproduct | undefined): void {
    if (product) {
      this.watchlater.saveImage(product, product.source || 'shop');
    }
  }

  loadSavedImages(): void {
    this.savedImages = this.watchlater.getSavedImages();
  }

  removeImage(index: number): void {
    this.watchlater.removeImage(index);
    this.loadSavedImages();
  }

  goToPymant() {
    return this.router.navigate(['/pymant']);
  }

  private handleProductData(data: Iproduct | undefined, source: string): void {
    this.oneProduct = data;
    if (this.oneProduct) {
      if (!this.oneProduct.quantity) {
        this.oneProduct.quantity = 1;
      }
      if (this.oneProduct.images && this.oneProduct.images.length > 0) {
        this.mainImage = this.oneProduct.images[0];
      }
      this.oneProduct.source = source;
    }
  }
  private handleError(err: any): void {
    this.errMsg = err.message || 'Product not found';
    console.error(err);
  }
}


