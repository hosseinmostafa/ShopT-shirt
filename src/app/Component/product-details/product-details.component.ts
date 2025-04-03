import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
import { ProductService } from '../../Service/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Iproduct } from '../interface/Iproduct';
import { CartService } from '../../Service/cart.service';
import { WhatchlaterHarteService } from '../../Service/whatchlater-harte.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit, OnDestroy, AfterViewInit  {
  productId: string | null = null;
  oneProduct: Iproduct | null = null;
  mainImage: string = 'assets/img/placeholder.png';
  errMsg: string | null = null;  products: Iproduct[] = [];
  filteredProducts: Iproduct[] = [];
  price: number = 0;
  colors: string[] = ['#000000', '#dc2626', '#2563eb', '#16a34a', 'yellow', '#8b5cf6', 'orange'];
  additionalColors: string[] = ['skyblue', 'palevioletred', 'white'];
  selectedColor: string | null = null;
  selectedCategories: string[] = [];
  selectedPriceRange: number = 0;
  selectedRating: number | null = null;
  quantity: number = 1;
  savedImages: any[] = [];

  
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
    const source = this.activatedRoute.snapshot.queryParamMap.get('source') || 'shop';

    if (this.productId) {
      this.loadProduct(this.productId, source);
    } else {
      this.errMsg = 'Product ID is missing';
    }
  }

  private loadProduct(id: string, source: string): void {
    const productObservable = source === 'new'
      ? this.productService.getOneNewProduct(id)
      : source === 'home'
        ? this.productService.getOneProductHome(id)
        : this.productService.getOneProduct(id);

    productObservable.subscribe({
      next: (data) => {
        this.handleProductData(data, source);
      },
      error: (err) => {
        this.handleError(err);
      }
    });
  }

  private handleProductData(data: Iproduct | undefined, source: string): void {
    if (!data) {
      this.errMsg = 'Product data is empty';
      return;
    }

    this.oneProduct = {
      ...data,
      quantity: data.quantity || 1,
      source: source
    };

    this.mainImage = data.images?.[0] || 'assets/img/placeholder.png';
  }

  private handleError(err: any): void {
    console.error('Error loading product:', err);
    this.errMsg = 'Failed to load product details';
    this.mainImage = 'assets/img/placeholder.png';
  }

  increaseQuantity(): void {
    if (this.oneProduct) {
      this.oneProduct.quantity = (this.oneProduct.quantity || 1) + 1;
      this.cartService.updateQuantity(this.oneProduct.id, this.oneProduct.quantity);
    }
  }

  decreaseQuantity(): void {
    if (this.oneProduct && this.oneProduct.quantity && this.oneProduct.quantity > 1) {
      this.oneProduct.quantity--;
      this.cartService.updateQuantity(this.oneProduct.id, this.oneProduct.quantity);
    }
  }

  updatePrice(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.selectedPriceRange = parseFloat(target.value) || 0;
  }

  updateQuantity(newQuantity: number): void {
    if (this.oneProduct) {
      this.oneProduct.quantity = Math.max(1, newQuantity || 1);
      this.cartService.updateQuantity(this.oneProduct.id, this.oneProduct.quantity);
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

  addToCart(): void {
    if (this.oneProduct) {
      this.cartService.addToCart(this.oneProduct);
    }
  }

  saveImage(product: any): void {
    if (this.oneProduct) {
      this.watchlater.saveImage(this.oneProduct, this.oneProduct.source || 'shop');
    }
  }

  loadSavedImages(): void {
    this.savedImages = this.watchlater.getSavedImages();
  }

  removeImage(index: number): void {
    this.watchlater.removeImage(index);
    this.loadSavedImages();
  }

  goToPymant(): void {
    this.router.navigate(['/pymant']);
  }

  getOneProduct(id: string): void {
    this.router.navigate(['/product', id]);
  }




  ngAfterViewInit(): void {
    this.setupZoomListeners();
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