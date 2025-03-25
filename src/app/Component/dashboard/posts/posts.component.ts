import { Component } from '@angular/core';
import { WhatchlaterHarteService } from '../../../Service/whatchlater-harte.service';
import { AuthService } from '../../../Service/auth.service';
import AOS from 'aos';
@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.scss'
})
export class PostsComponent {
  newProducts: any[] = [];

  constructor(
    private watchlater: WhatchlaterHarteService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.loadNewProducts();
    AOS.init({
      offset: 120,
      delay: 0,
      duration: 900,
      easing: 'ease',
      once: false,
      mirror: false,
      anchorPlacement: 'top-bottom',
    });
  }

  loadNewProducts(): void {
    this.watchlater.getNewProducts().subscribe({
      next: (products: any) => {
        // Convert the Firebase object to array if needed
        if (products && typeof products === 'object') {
          this.newProducts = Object.keys(products).map(key => ({
            id: key,
            ...products[key]
          }));
        } else {
          this.newProducts = products || [];
        }
      },
      error: (error) => {
        console.error('Error loading new products:', error);
      }
    });
  }

  removeImage(index: number): void {
    try {
      this.watchlater.removeImage(index);
      this.loadNewProducts();
    } catch (error) {
      console.error('Error removing image:', error);
    }
  }
}
