import { Component, HostListener } from '@angular/core';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  constructor() { }

  showAlert: boolean = true;

  hideMessage() {
    this.showAlert = false;

  
    document.querySelector('.navbar')?.classList.add('no-alert');
    document.querySelector('body')?.classList.add('no-alert');
    document.querySelector('.home-page')?.classList.add('no-alert');
  }

}
