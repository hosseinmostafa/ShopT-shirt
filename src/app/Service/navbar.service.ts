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

  hideNavbar(): void {
    this.showNavbar.next(false);
  }

  display(): void {
    this.showNavbar.next(true);
  }
}



