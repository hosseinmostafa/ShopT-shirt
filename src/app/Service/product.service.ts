import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, throwError } from 'rxjs';
import { Iproduct } from '../Component/interface/Iproduct';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'https://shop-tt-default-rtdb.firebaseio.com/Products.json';

  private productsSubject = new BehaviorSubject<Iproduct[]>([]);
  constructor(private http: HttpClient) {
    this.loadProducts();
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
    console.log('Fetching products from:', url); // Debugging line

    return this.http.get<{ [key: string]: any }>(url).pipe(
      map(response => {
        console.log('Response from Firebase:', response); // Debugging line
        if (!response) {
          throw new Error('No data found in Firebase.');
        }
        return Object.keys(response)
          .filter(key => response[key] !== null) // Filter out null values
          .map(key => ({
            id: key,  // Convert Firebase key to id
            name: response[key].name,
            price: response[key].price,
            image: response[key].image,
            // filtter
            category: response[key].category,
            color: response[key].color,
            rating: response[key].rating
          }));
      }),
      catchError((err) => {
        console.error('Error fetching products:', err);
        return throwError(() => new Error('Failed to fetch products.'));
      })
    );
  }
}


