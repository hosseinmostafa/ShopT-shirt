import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { NavbarService } from '../../Service/navbar.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss'
})
export class NavComponent implements OnInit{
  showAlert: boolean = true;
  message: string = 'Sign up and get 20% off to your first order 🎉';
  button: string = 'Sign Up Now';
  showNavbar: boolean = true;
  subscription: Subscription;
  

  constructor(
    private navbarService: NavbarService
  ) {
    this.subscription = this.navbarService.showNavbar.subscribe((value) => {
      this.showNavbar = value;
    }); }

  private messages = [
    { message: 'Sign up and get 20% off to your first order 🎉', button: 'Sign Up Now' },
    { message: 'Limited time offer: Free shipping!', button: 'Shop Now' },
    { message: 'Join our rewards program today!', button: 'Learn More' }
  ];

  private currentIndex: number = 0;

  ngOnInit(): void {
    this.startMessageRotation();
  }

  startMessageRotation() {
    setInterval(() => {
      this.currentIndex = (this.currentIndex + 1) % this.messages.length;
      this.message = this.messages[this.currentIndex].message;
      this.button = this.messages[this.currentIndex].button;
    }, 5000);
  }


  hideMessage() {
    this.showAlert = false; // إخفاء الـ Alert

    // إضافة كلاس "no-alert" إلى الـ Navbar و body
    document.querySelector('.navbar')?.classList.add('no-alert');
    document.querySelector('body')?.classList.add('no-alert');
  }
}
