import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Iproduct } from '../Component/interface/Iproduct';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItemsSubject = new BehaviorSubject<Iproduct[]>([]);
  cartItems$ = this.cartItemsSubject.asObservable();

  constructor() {
    this.loadCartItems();
  }

  private loadCartItems(): void {
    const savedCartItems = localStorage.getItem('cartItems');
    if (savedCartItems) {
      this.cartItemsSubject.next(JSON.parse(savedCartItems));
    }
  }
  

  private saveCartItems(items: Iproduct[]): void {
    localStorage.setItem('cartItems', JSON.stringify(items));
  }

  addToCart(product: Iproduct): void {
    const currentItems = this.cartItemsSubject.getValue();
    const existingItem = currentItems.find(item => item.id === product.id);

    if (existingItem) {
      existingItem.quantity++;
    } else {
      const newProduct = { ...product, quantity: 1 };
      currentItems.push(newProduct);
    }
    this.cartItemsSubject.next([...currentItems]);
    this.saveCartItems(currentItems);
  }

  getCartItemCount(): number {
    return this.cartItemsSubject.getValue().reduce((total, item) => total + item.quantity, 0);
  }

  getCartItems(): Iproduct[] {
    return this.cartItemsSubject.getValue();
  }

  removeFromCart(productId: string): void {
    const currentItems = this.cartItemsSubject.getValue();
    const updatedItems = currentItems.filter(item => item.id !== productId);
    this.cartItemsSubject.next([...updatedItems]);
    this.saveCartItems(updatedItems);
  }

  updateQuantity(productId: string, quantity: number): void {
    const currentItems = this.cartItemsSubject.getValue();
    const itemToUpdate = currentItems.find(item => item.id === productId);

    if (itemToUpdate && quantity > 0) {
      itemToUpdate.quantity = quantity;
      this.cartItemsSubject.next([...currentItems]);
      this.saveCartItems(currentItems);
    }
  }
  getTotalPrice(): number {
    return this.cartItemsSubject.getValue().reduce((total, item) => total + item.price * item.quantity, 0);
  }

  clearCart(): void {
    this.cartItemsSubject.next([]);
    localStorage.removeItem('cartItems');
  }


}