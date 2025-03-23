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
    const userEmail = localStorage.getItem('userEmail');
    if (userEmail) {
      this.loadCartItems(userEmail);
    }
  }

  loadCartItems(userEmail: string): void {
    try {
      const savedCartItems = localStorage.getItem(`cartItems_${userEmail}`);
      if (savedCartItems) {
        this.cartItemsSubject.next(JSON.parse(savedCartItems));
      }
    } catch (error) {
      console.error('Error loading cart items:', error);
    }
  }

  private saveCartItems(userEmail: string, items: Iproduct[]): void {
    try {
      localStorage.setItem(`cartItems_${userEmail}`, JSON.stringify(items));
    } catch (error) {
      console.error('Error saving cart items:', error);
    }
  }

  addToCart(product: Iproduct): void {
    const userEmail = localStorage.getItem('userEmail');
    if (!userEmail) return;

    const currentItems = this.cartItemsSubject.getValue();
    const existingItem = currentItems.find(item => item.id === product.id);

    if (existingItem) {
      existingItem.quantity++;
    } else {
      const newProduct = { ...product, quantity: 1 };
      currentItems.push(newProduct);
    }
    this.cartItemsSubject.next([...currentItems]);
    this.saveCartItems(userEmail, currentItems);
  }

  getCartItemCount(): number {
    return this.cartItemsSubject.getValue().reduce((total, item) => total + item.quantity, 0);
  }

  getCartItems(): Iproduct[] {
    return this.cartItemsSubject.getValue();
  }

  removeFromCart(productId: string): void {
    const userEmail = localStorage.getItem('userEmail');
    if (!userEmail) return;

    const currentItems = this.cartItemsSubject.getValue();
    const updatedItems = currentItems.filter(item => item.id !== productId);
    this.cartItemsSubject.next([...updatedItems]);
    this.saveCartItems(userEmail, updatedItems);
  }

  updateQuantity(productId: string, quantity: number): void {
    const userEmail = localStorage.getItem('userEmail');
    if (!userEmail) return;

    const currentItems = this.cartItemsSubject.getValue();
    const itemToUpdate = currentItems.find(item => item.id === productId);

    if (itemToUpdate && quantity > 0) {
      itemToUpdate.quantity = quantity;
      this.cartItemsSubject.next([...currentItems]);
      this.saveCartItems(userEmail, currentItems);
    }
  }

  getTotalPrice(): number {
    return this.cartItemsSubject.getValue().reduce((total, item) => total + item.price * item.quantity, 0);
  }

  clearCart(): void {
    const userEmail = localStorage.getItem('userEmail');
    if (!userEmail) return;

    this.cartItemsSubject.next([]);
    localStorage.removeItem(`cartItems_${userEmail}`);
  }
  
}



