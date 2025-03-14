import { Component } from '@angular/core';
import { ProductService } from '../../Service/product.service';
import { ActivatedRoute } from '@angular/router';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent {
  bigImgSrc: string = ''; 
  oneProduct: any; 
  productId: any;
  errMsg: any; 

  mainImage: string = ''; 

  constructor(private productService: ProductService, private activatedRoute: ActivatedRoute) { }

  
  changeMainImage(image: string): void {
    this.mainImage = image;
  }

  ngOnInit(): void {
    this.productId = this.activatedRoute.snapshot.paramMap.get('id');
    if (this.productId) {
      this.productService.getOneProduct(this.productId).subscribe({
        next: (data) => {
          this.oneProduct = data;
          console.log(this.oneProduct);

          
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
}