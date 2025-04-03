import { Component, OnInit } from '@angular/core';
import { debounceTime, distinctUntilChanged, Subscription } from 'rxjs';
import { NavbarService } from '../../Service/navbar.service';
import { CartService } from '../../Service/cart.service';
import { AuthService } from '../../Service/auth.service';
import { Router } from '@angular/router';
import { SearchService } from '../../Service/search.service';
import { HttpClient } from '@angular/common/http';
import { NgxSpinnerService } from 'ngx-spinner';

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
  searchTerm: string = '';
  showAuthAlert: boolean = false;
  authAlertTitle: string = '';
  authAlertMessage: string = '';
  showSearchAlert: boolean = false;
  searchAlertTitle: string = '';
  searchAlertMessage: string = '';

  constructor(
    private navbarService: NavbarService,
    private cartService: CartService,
    private authService: AuthService,
    private router: Router,
    private searchService: SearchService,
    private http: HttpClient,
    private spinner: NgxSpinnerService
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
  ];

  private currentIndex: number = 0;

  ngOnInit(): void {
    this.openSpinner1();
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


  searchResults: any[] = [];

  onSearchInput(event: Event) {
    const term = (event.target as HTMLInputElement).value;
    this.searchTerm = term;

    if (term.trim().length > 0) {
      this.searchService.search(term)
        .pipe(
          debounceTime(300),
          distinctUntilChanged()
        )
        .subscribe({
          next: (results) => {
            this.searchResults = results.map(item => ({
              ...item,
              id: item.id || this.generateId(item)
            }));
          },
          error: (err) => {
            console.error('Search error:', err);
            this.searchResults = [];
          }
        });
    } else {
      this.searchResults = [];
    }
  }

  private generateId(item: any): string {
    return item.name.toLowerCase().replace(/\s+/g, '-') + '-' + Math.random().toString(36).substr(2, 9);
  }

  onSearch() {
    if (this.searchTerm.trim()) {
      this.searchService.search(this.searchTerm).subscribe({
        next: (results) => {
          if (results.length > 0) {
            this.router.navigate(['/search'], {
              state: { results, term: this.searchTerm }
            });
          } else {
            this.showSearchErrorAlert();
          }
        },
        error: (err) => {
          console.error('Search error:', err);
          this.showSearchErrorAlert();
        }
      });
    }
  }

  showSearchErrorAlert() {
    this.searchAlertTitle = 'No Results Found';
    this.searchAlertMessage = `No items found for "${this.searchTerm}"`;
    this.showSearchAlert = true;
  }

  onSearchAlertYes() {
    this.showSearchAlert = false;
  }

  onSearchAlertNo() {
    this.showSearchAlert = false;
  }

  showNoResultsAlert() {
    this.alertTitle = 'No Results';
    this.alertMessage = `No items found for "${this.searchTerm}"`;
    this.showCustomAlert = true;
  }

  isSearchExpanded: boolean = false;
  expandSearch() {
    this.isSearchExpanded = true;
    document.body.style.overflow = 'hidden';
  }

  collapseSearch() {
    this.isSearchExpanded = false;
    document.body.style.overflow = '';
    this.searchTerm = '';
    this.searchResults = [];
  }
  openSpinner1(): void {
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide(); 
    }, 2000);
  }
}