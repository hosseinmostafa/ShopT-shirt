import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { NavbarService } from '../../Service/navbar.service';
import { CartService } from '../../Service/cart.service';
import { AuthService } from '../../Service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent implements OnInit {
  showAlert: boolean = true;
  message: string = 'Sign up and get 20% off to your first order 🎉';
  button: string = 'Sign Up Now';
  showNavbar: boolean = true;
  subscription: Subscription;
  cartItemCount: number = 0;
  isLoggedIn: boolean = false;
  currentLink: string = '';

  showCustomAlert: boolean = false;
  alertTitle: string = '';
  alertMessage: string = '';

  constructor(
    private navbarService: NavbarService,
    private cartService: CartService,
    private authService: AuthService,
    private router: Router
  ) {
    this.subscription = this.navbarService.showNavbar.subscribe((value) => {
      this.showNavbar = value;
    });
    this.navbarService.showAlert.subscribe((value) => {
      this.showAlert = value;
    });
  }

  private messages = [
    { message: 'Sign up and get 20% off to your first order 🎉', button: 'Sign Up Now', link: '/signup' },
    { message: 'Limited time offer: Free shipping!', button: 'Shop Now', link: '/shop' },
    // { message: 'Join our rewards program today!', button: 'Learn More' },
  ];

  private currentIndex: number = 0;

  ngOnInit(): void {
    this.startMessageRotation();
    this.cartService.cartItems$.subscribe((items) => {
      this.cartItemCount = this.cartService.getCartItemCount();
    });

    this.authService.isLoggedIn$.subscribe((loggedIn) => {
      this.isLoggedIn = loggedIn;
    });
  }

  startMessageRotation() {
    setInterval(() => {
      this.currentIndex = (this.currentIndex + 1) % this.messages.length;
      this.message = this.messages[this.currentIndex].message;
      this.button = this.messages[this.currentIndex].button;
      this.currentLink = this.messages[this.currentIndex].link;
    }, 5000);
  }

  hideMessage() {
    this.showAlert = false;
    document.querySelector('.navbar')?.classList.add('no-alert');
    document.querySelector('body')?.classList.add('no-alert');
  }

  showCustomAlertMessage() {
    this.alertTitle = 'Confirm exit';
    this.alertMessage = 'Are you sure you want to log out?';
    this.showCustomAlert = true;
  }

  onAlertYes() {
    this.authService.logout();
    this.showCustomAlert = false;
    this.router.navigate(['/']);
  }

  onAlertNo() {
    this.showCustomAlert = false;
  }

  onUserIconClick() {
    if (this.isLoggedIn) {
      this.showCustomAlertMessage();
    } else {
      this.router.navigate(['/signup']);
    }
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }



}