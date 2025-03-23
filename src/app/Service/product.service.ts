import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, switchMap, throwError, timer } from 'rxjs';
import { Iproduct } from '../Component/interface/Iproduct';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private productsSubject = new BehaviorSubject<Iproduct[]>([]);
  private retryDelay = 3000;

  constructor(private http: HttpClient) {
    this.loadProducts();
    this.loadProductsHome();
  }

  private transformProductData(response: { [key: string]: any }): Iproduct[] {
    if (!response) {
      throw new Error('No data found in Firebase.');
    }
    return Object.keys(response)
      .filter(key => response[key] !== null)
      .map(key => ({
        id: key,
        name: response[key].name,
        price: response[key].price,
        images: response[key].images || [response[key].image],
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
      }));
  }

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
}