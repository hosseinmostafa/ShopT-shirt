import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userRoles: string[] = [];
  private isLoggedInSubject = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this.isLoggedInSubject.asObservable();

  constructor() {
    this.checkLoginStatus();
  }

  checkLoginStatus() {
    const token = localStorage.getItem('token');
    this.isLoggedInSubject.next(!!token);
  }

  login(token: string) {
    localStorage.setItem('token', token);
    this.isLoggedInSubject.next(true);
  }

  logout() {
    localStorage.removeItem('token');
    this.isLoggedInSubject.next(false);
  }

  isLoggedIn(): boolean {
    return this.isLoggedInSubject.value; // الحصول على القيمة الحالية
  }

  getUserRoles(): string[] {
    return this.userRoles;
  }

  setUserRoles(roles: string[]): void {
    this.userRoles = roles; // تعيين الأدوار
  }
}