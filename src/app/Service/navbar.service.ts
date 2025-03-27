import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavbarService {
  showNavbar: BehaviorSubject<boolean>;
  showAlert = new BehaviorSubject<boolean>(true);
  constructor() {
    this.showNavbar = new BehaviorSubject<boolean>(true);
  }

  hideNavbar(): void {
    this.showNavbar.next(false);
  }

  display(): void {
    this.showNavbar.next(true);
  }
  hideAlert() {
    this.showAlert.next(false);
  }
}



