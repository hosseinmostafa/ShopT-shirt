import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userRoles: string[] = [];
  private isLoggedInSubject = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this.isLoggedInSubject.asObservable();

  constructor(private router: Router) {
    this.checkLoginStatus();
  }

  checkLoginStatus() {
    const token = localStorage.getItem('token');
    this.isLoggedInSubject.next(!!token);
  }

  login(token: string, email: string, roles: string[] = []): void {
    localStorage.setItem('token', token);
    localStorage.setItem('userEmail', email);
    this.setUserRoles(roles);
    this.isLoggedInSubject.next(true);
  }

  logout(): void {
    const userEmail = this.getUserEmail();

    localStorage.removeItem('token');
    localStorage.removeItem('userEmail');
    localStorage.removeItem(`cartItems_${userEmail}`);
    localStorage.removeItem(`savedImages_${userEmail}`);
    localStorage.removeItem('role');

    this.userRoles = [];
    this.isLoggedInSubject.next(false);

    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return this.isLoggedInSubject.value;
  }

  getUserRoles(): string[] {
    return this.userRoles;
  }

  setUserRoles(roles: string[]): void {
    this.userRoles = roles;
    localStorage.setItem('role', JSON.stringify(roles));
  }

  getUserEmail(): string | null {
    return localStorage.getItem('userEmail');
  }

  loggedIn: boolean = false;
  redirectUrl: string = '';
  isAuthenticatedd(): boolean {
    return this.isLoggedIn();
  }
}