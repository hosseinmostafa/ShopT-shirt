import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FooterService {
  showFooter = new BehaviorSubject<boolean>(true);
  showWelcomeMessage = new BehaviorSubject<boolean>(false);

  constructor() {
    this.showFooter = new BehaviorSubject(true);
    this.showWelcomeMessage = new BehaviorSubject(false);
  }

  hideFooter(): void {
    this.showFooter.next(false);
  }

  displayFooter(): void {
    this.showFooter.next(true);
  }

  showWelcome(): void {
    this.showWelcomeMessage.next(true);
  }

  hideWelcome(): void {
    this.showWelcomeMessage.next(false);
  }
}