import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private totalPriceSubject = new BehaviorSubject<number>(0);
  totalPrice$ = this.totalPriceSubject.asObservable();

  constructor() {
    const savedTotalPrice = localStorage.getItem('totalPrice');
    if (savedTotalPrice) {
      this.totalPriceSubject.next(JSON.parse(savedTotalPrice));
    }
  }

  setTotalPrice(price: number): void {
    this.totalPriceSubject.next(price);
    localStorage.setItem('totalPrice', JSON.stringify(price));
  }

  getTotalPrice(): number {
    return this.totalPriceSubject.getValue();
  }

  clearTotalPrice(): void {
    this.totalPriceSubject.next(0);
    localStorage.removeItem('totalPrice');
  }
}
