import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, throwError } from 'rxjs';
import { Iproduct } from '../Component/interface/Iproduct';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private productsSubject = new BehaviorSubject<Iproduct[]>([]);
  constructor(private http: HttpClient) {
    this.loadProducts();
    this.loadProductsHome();
  }

  loadProducts(): void {
    this.getProducts().subscribe({
      next: (products) => {
        this.productsSubject.next(products); // Update the BehaviorSubject
      },
      error: (err) => console.error('Error loading products:', err),
    });
  }

  getProducts(): Observable<Iproduct[]> {
    const url = `https://shop-tt-default-rtdb.firebaseio.com/Products.json`;

    return this.http.get<{ [key: string]: any }>(url).pipe(
      map(response => {
        if (!response) {
          throw new Error('No data found in Firebase.');
        }
        return Object.keys(response)
          .filter(key => response[key] !== null)
          .map(key => ({
            id: response[key].id,
            name: response[key].name,
            price: response[key].price,
            images: response[key].images || [response[key].image],
            description: response[key].description || 'No description available.',
            category: response[key].category || [response[key].category] || 'Uncategorized',
            color: response[key].color ||[response[key].color] || 'N/A',
            rating: response[key].rating || 0,
            material: response[key].material || [response[key].material] || 'N/A',
            dimensions: response[key].dimensions || 'N/A',
            date: response[key].date || 'N/A',
            quantity: response[key].quantity || 0,
            type: response[key].type || "N/A",
            sizes: response[key].sizes || [response[key].sizes] || "N/A"
          }));
      }),
      catchError((err) => {
        console.error('Error fetching products:', err);
        return throwError(() => new Error('Failed to fetch products.'));
      })
    );
  }

  // -----------------------------------
  loadProductsHome(): void {
    this.getProductsHome().subscribe({
      next: (products) => {
        this.productsSubject.next(products); // Update the BehaviorSubject
      },
      error: (err) => console.error('Error loading products:', err),
    });
  }
  getProductsHome(): Observable<Iproduct[]> {
    const url = `https://shop-tt-default-rtdb.firebaseio.com/ProductsHome.json`;

    return this.http.get<{ [key: string]: any }>(url).pipe(
      map(response => {
        if (!response) {
          throw new Error('No data found in Firebase.');
        }
        return Object.keys(response)
          .filter(key => response[key] !== null)
          .map(key => ({
            id: response[key].id,
            name: response[key].name,
            price: response[key].price,
            images: response[key].images || [response[key].image],
            description: response[key].description || 'No description available.',
            category: response[key].category || [response[key].category] || 'Uncategorized',
            color: response[key].color ||[response[key].color] || 'N/A',
            rating: response[key].rating || 0,
            material: response[key].material || [response[key].material] || 'N/A',
            dimensions: response[key].dimensions || 'N/A',
            date: response[key].date || 'N/A',
            quantity: response[key].quantity || 0,
            type: response[key].type || "N/A",
            sizes: response[key].sizes || [response[key].sizes] || "N/A"
          }));
      }),
      catchError((err) => {
        console.error('Error fetching products:', err);
        return throwError(() => new Error('Failed to fetch products.'));
      })
    );
  }




  // -----------------------------------

  getOneProduct(id: string): Observable<Iproduct | undefined> {
    return this.getProducts().pipe(
      map((products: Iproduct[]) => {
        const oneProduct = products.find((product) => product.id === id);
        if (!oneProduct) throw new Error('Product not found');
        return oneProduct;
      }),
      catchError((err) => throwError(() => err.message || 'Product not found'))
    );
  }

  getOneProductHome(id: string): Observable<Iproduct | undefined> {
    return this.getProductsHome().pipe(
      map((products: Iproduct[]) => {
        const oneProduct = products.find((product) => product.id === id);
        if (!oneProduct) throw new Error('Product not found');
        return oneProduct;
      }),
      catchError((err) => throwError(() => err.message || 'Product not found'))
    );
  }

  
}


