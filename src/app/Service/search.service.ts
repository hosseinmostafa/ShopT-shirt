import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  private searchResults = new BehaviorSubject<any[]>([]);
  private searchTerm = new BehaviorSubject<string>('');
  private firebaseUrl = 'https://shop-tt-default-rtdb.firebaseio.com';

  constructor(private http: HttpClient) { }

  search(term: string): Observable<any[]> {
    return this.http.get(`${this.firebaseUrl}/Products.json`).pipe(
      map((response: any) => {
        if (!term || !response) return [];

        const products = Object.keys(response).map(key => ({
          id: key,
          ...response[key]
        }));

        const lowerTerm = term.toLowerCase();
        return products.filter(product =>
          product.name?.toLowerCase().includes(lowerTerm) ||
          product.description?.toLowerCase().includes(lowerTerm) ||
          product.category?.toLowerCase().includes(lowerTerm)
        );
      })
    );
  }


  private transformFirebaseResponse(data: any): any[] {
    return Object.keys(data).map(key => ({
      id: key,
      ...data[key]
    }));
  }

  getSearchResults(): Observable<any[]> {
    return this.searchResults.asObservable();
  }

  getSearchTerm(): Observable<string> {
    return this.searchTerm.asObservable();
  }

  clearSearch() {
    this.searchResults.next([]);
    this.searchTerm.next('');
  }
}
