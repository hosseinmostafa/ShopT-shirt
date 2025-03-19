import { Component } from '@angular/core';
import { Iproduct } from '../../interface/Iproduct';
import { ProductService } from '../../../Service/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-detiles-inproduct',
  templateUrl: './detiles-inproduct.component.html',
  styleUrl: './detiles-inproduct.component.scss'
})
export class DetilesInproductComponent {
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
    private router: Router
  ) { }


  changeMainImage(image: string): void {
    this.mainImage = image;
  }

  // ngOnInit(): void {
  //   this.productId = this.activatedRoute.snapshot.paramMap.get('id');
  //   if (this.productId) {
  //     this.productService.getOneProductDittels(this.productId).subscribe({
  //       next: (data) => {
  //         this.oneProduct = data;
  //         console.log(this.oneProduct);


  //         if (this.oneProduct.images && this.oneProduct.images.length > 0) {
  //           this.mainImage = this.oneProduct.images[0];
  //         }
  //       },
  //       error: (err) => {
  //         this.errMsg = err.message || 'Product not found';
  //         return throwError(() => err);
  //       }
  //     });
  //   }
  //   this.loadProductsDetills();
  // }
  // quantity: number = 1;

  // increaseQuantity(): void {
  //   this.quantity++;
  // }

  // decreaseQuantity(): void {
  //   if (this.quantity > 1) {
  //     this.quantity--;
  //   }
  // }

  // loadProductsDetills(): void {
  //   this.productService.getProductsInShowProductsDetilles().subscribe({
  //     next: (data) => {
  //       this.products = data;
  //       this.filteredProducts = data;
  //     },
  //     error: (err) => {
  //       this.errMsgProduct = err;
  //       console.error('Error loading products:', err);
  //     },
  //   });
  // }

  // updatePrice(event: Event): void {
  //   const target = event.target as HTMLInputElement;
  //   this.selectedPriceRange = parseFloat(target.value);
  // }

  // selectColor(color: string): void {
  //   this.selectedColor = this.selectedColor === color ? null : color;
  // }


  
}
