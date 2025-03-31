import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, finalize, forkJoin, map, Observable, of, switchMap, throwError, timer } from 'rxjs';
import { Iproduct } from '../Component/interface/Iproduct';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private productsSubject = new BehaviorSubject<Iproduct[]>([]);
  private retryDelay = 3000;
  private firebaseUrl = 'https://shop-tt-default-rtdb.firebaseio.com';

  constructor(private http: HttpClient) {
    this.loadProducts();
    this.loadProductsHome();
    this.loadNewProducts()
  }

  private transformProductData(response: { [key: string]: any }): Iproduct[] {
    if (!response) {
      throw new Error('No data found in Firebase.');
    }
    return Object.keys(response)
      .filter(key => response[key] !== null)
      .map(key => {
        let images: string[] = [];

        if (response[key].images) {
          if (Array.isArray(response[key].images)) {
            images = response[key].images.map((img: any) =>
              typeof img === 'string' ? img :
                (img.url || 'assets/img/placeholder.png')
            );
          } else if (typeof response[key].images === 'string') {
            images = [response[key].images];
          } else if (response[key].images.url) {
            images = [response[key].images.url];
          }
        } else {
          images = ['assets/img/placeholder.png'];
        }
        return {
          id: key,
          name: response[key].name,
          price: response[key].price,
          images: images,
          description: response[key].description || 'No description available.',
          category: Array.isArray(response[key].category) ? response[key].category : ['Uncategorized'],
          color: response[key].color || [response[key].color] || ['N/A'],
          rating: response[key].rating || 0,
          material: response[key].material || [response[key].material] || ['N/A'],
          dimensions: response[key].dimensions || 'N/A',
          date: response[key].date || 'N/A',
          quantity: response[key].quantity || 0,
          type: response[key].type || "N/A",
          sizes: response[key].sizes || [response[key].sizes] || ["N/A"],
          style: response[key].style || "N/A",
        };
      });

  }
  // shop ---------------------------------------------
  loadProducts(): void {
    this.getProducts().subscribe({
      next: (products) => {
        this.productsSubject.next(products);
      },
      error: (err) => console.error('Error loading products:', err),
    });
  }

  getProducts(): Observable<Iproduct[]> {
    const url = `https://shop-tt-default-rtdb.firebaseio.com/Products.json`;

    return this.http.get<{ [key: string]: any }>(url).pipe(
      map(this.transformProductData),
      catchError((err) => this.handleError(err, 'Failed to fetch products.'))
    );
  }

  // Procuct Home---------------------------------------------
  loadProductsHome(): void {
    this.getProductsHome().subscribe({
      next: (products) => {
        this.productsSubject.next(products);
      },
      error: (err) => console.error('Error loading products:', err),
    });
  }
  getProductsHome(): Observable<Iproduct[]> {
    const url = `https://shop-tt-default-rtdb.firebaseio.com/ProductsHome.json`;

    return this.http.get<{ [key: string]: any }>(url).pipe(
      map(this.transformProductData),
      catchError((err) => this.handleError(err, 'Failed to fetch home products.'))
    );
  }

  getOneProduct(id: string): Observable<Iproduct | undefined> {
    return this.getProducts().pipe(
      map((products: Iproduct[]) => {
        const oneProduct = products.find((product) => product.id === id);
        if (!oneProduct) throw new Error('Product not found');
        return oneProduct;
      }),
      catchError((err) => this.handleError(err, 'Product not found'))
    );
  }

  getOneProductHome(id: string): Observable<Iproduct | undefined> {
    return this.getProductsHome().pipe(
      map((products: Iproduct[]) => {
        const oneProduct = products.find((product) => product.id === id);
        if (!oneProduct) throw new Error('Product not found');
        return oneProduct;
      }),
      catchError((err) => this.handleError(err, 'Product not found'))
    );
  }
  // ---------------------------------------------

  // NewProducts---------------------------------------------
  loadNewProducts(): void {
    this.getNewProducts().subscribe({
      next: (products) => {
        this.productsSubject.next(products);
      },
      error: (err) => console.error('Error loading products:', err),
    });
  }

  // ---------------------------------------------

  private handleError(error: HttpErrorResponse, customMessage: string): Observable<never> {
    if (error.status === 0) {
      console.error('Network error:', error.error);
      return throwError(() => new Error('No internet connection. Please check your network.'));
    } else {
      console.error(`Backend returned code ${error.status}, body was: `, error.error);
      return throwError(() => new Error(customMessage));
    }
  }

  private retryAfterDelay<T>(observable: Observable<T>, delay: number): Observable<T> {
    return observable.pipe(
      catchError((err) => {
        console.error('Retrying after delay...');
        return timer(delay).pipe(
          switchMap(() => observable)
        );
      })
    );
  }

  private isValidImageUrl(url: string): boolean {
    try {
      new URL(url);

      const allowedDomains = [
        'drive.google.com',
        'googleusercontent.com',
        'dropbox.com',
        'imgur.com'
      ];

      const urlObj = new URL(url);
      const isAllowedDomain = allowedDomains.some(domain => urlObj.hostname.includes(domain));
      const isImageExtension = /\.(jpg|jpeg|png|gif|webp|bmp)$/i.test(urlObj.pathname);

      return isAllowedDomain || isImageExtension;
    } catch {
      return false;
    }
  }


  addNewProduct(product: Iproduct): Observable<any> {
    const invalidLinks = product.images.filter(img => !this.isValidImageUrl(img));
    if (invalidLinks.length > 0) {
      return throwError(() => new Error(`Invalid image links: ${invalidLinks.join(', ')}`));
    }

    const newProduct = {
      ...product,
      date: new Date().toISOString(),
      rating: 0,
      images: product.images.map((img, index) => ({
        id: index,
        url: img,
        verified: true
      }))
    };

    return this.http.post(`${this.firebaseUrl}/New-products.json`, newProduct);
  }


  uploadImages(images: File[]): Observable<string[]> {
    return new Observable(subscriber => {
      setTimeout(() => {
        const urls = images.map(img => URL.createObjectURL(img));
        subscriber.next(urls);
        subscriber.complete();
      }, 1000);
    });
  }

  private convertToBase64(file: File): Observable<string> {
    return new Observable(observer => {
      const reader = new FileReader();
      reader.onload = () => observer.next(reader.result as string);
      reader.onerror = error => observer.error(error);
      reader.readAsDataURL(file);
      return () => reader.abort();
    });
  }

  getOneNewProduct(id: string): Observable<Iproduct | undefined> {
    return this.http.get(`${this.firebaseUrl}/New-products/${id}.json`).pipe(
      map((product: any) => product ? { id, ...product } : undefined),
      catchError((err) => this.handleError(err, 'Product not found'))
    );
  }


  // ---------------------------------
  // new-arrivals-productdetails
  loadNewArrivalsProductDetails(): void {
    this.getNewProducts().subscribe({
      next: (products) => {
        this.productsSubject.next(products);
      },
      error: (err) => console.error('Error loading products:', err),
    });
  }
  getOneNewArrivalsProductDetails(id: string): Observable<Iproduct | undefined> {
    return this.getNewProducts().pipe(
      map((products: Iproduct[]) => {
        const oneProduct = products.find((product) => product.id === id);
        if (!oneProduct) throw new Error('Product not found');
        return oneProduct;
      }),
      catchError((err) => this.handleError(err, 'Product not found'))
    );
  }

  getNewProducts(): Observable<Iproduct[]> {
    const url = `https://shop-tt-default-rtdb.firebaseio.com/New-products.json`;
    return this.http.get<{ [key: string]: any }>(url).pipe(
      map(this.transformProductData),
      catchError((err) => this.handleError(err, 'Failed to fetch new products.'))
    );
  }

}
