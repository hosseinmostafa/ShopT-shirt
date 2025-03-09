import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavbarService {
  showNavbar: BehaviorSubject<boolean>;
  constructor() {
    this.showNavbar = new BehaviorSubject<boolean>(true);
  }

  // toggleNavbar(): void {
  //   this.showNavbar.next(!this.showNavbar.value);
  // }

  hideNavbar(): void {
    this.showNavbar.next(false);
  }

  display(): void {
    this.showNavbar.next(true);
  }
}
