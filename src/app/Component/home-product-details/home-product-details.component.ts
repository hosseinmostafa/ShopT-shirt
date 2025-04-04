import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
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
export class HomeProductDetailsComponent implements OnDestroy, AfterViewInit {
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


  isZoomed = false;
  zoomTransform = 'scale(1)';
  zoomOrigin = 'center center';
  private zoomMoveListener!: () => void;
  private zoomOutListener!: () => void;
  
  @ViewChild('zoomContainer') zoomContainer!: ElementRef;



  constructor(
    private productService: ProductService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private cartService: CartService,
    private watchlater: WhatchlaterHarteService,
    private renderer: Renderer2
  ) { }
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
    this.watchlater.saveImage(product, 'shop');
  }
  goToPymant(): void {
    this.router.navigate(['/pymant']);
  }




  ngAfterViewInit(): void {
    this.setupZoomListeners();
    // this.enableMobileZoom();
  }

  ngOnDestroy(): void {
    this.cleanupZoomListeners();
  }

  onMouseEnter(): void {
    this.isZoomed = true;
  }

  onMouseLeave(): void {
    this.isZoomed = false;
    this.zoomTransform = 'scale(1)';
  }

  onMouseMove(event: MouseEvent): void {
    if (this.isZoomed) {
      const container = this.zoomContainer.nativeElement;
      const rect = container.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      const percentX = (x / rect.width) * 100;
      const percentY = (y / rect.height) * 100;
      this.zoomOrigin = `${percentX}% ${percentY}%`;
      this.zoomTransform = 'scale(2)';
    }
  }

  private setupZoomListeners(): void {
    if (this.zoomContainer) {
      this.zoomMoveListener = this.renderer.listen(
        this.zoomContainer.nativeElement,
        'mousemove',
        (event) => this.onMouseMove(event)
      );

      this.zoomOutListener = this.renderer.listen(
        this.zoomContainer.nativeElement,
        'mouseleave',
        () => this.onMouseLeave()
      );
    }
  }

  private cleanupZoomListeners(): void {
    if (this.zoomMoveListener) {
      this.zoomMoveListener();
    }
    if (this.zoomOutListener) {
      this.zoomOutListener();
    }
  }

  changeMainImage(image: string): void {
    this.mainImage = image;
    this.isZoomed = false;
    this.zoomTransform = 'scale(1)';
  }
}


