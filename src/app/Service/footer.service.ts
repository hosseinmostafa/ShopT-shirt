import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FooterService {

  showFooter = new BehaviorSubject<boolean>(true);

  constructor() {
    this.showFooter = new BehaviorSubject(true);
  }

  hideFooter(): void {
    this.showFooter.next(false);
  }

  displayFooter(): void {
    this.showFooter.next(true);
  }
}
