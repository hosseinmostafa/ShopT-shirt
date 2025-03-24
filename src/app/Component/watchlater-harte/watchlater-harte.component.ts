import { Component, OnInit } from '@angular/core';
import { WhatchlaterHarteService } from '../../Service/whatchlater-harte.service';
import { Iproduct } from '../interface/Iproduct';
import { CartService } from '../../Service/cart.service';
import { AuthService } from '../../Service/auth.service';
import AOS from 'aos';

@Component({
  selector: 'app-watchlater-harte',
  templateUrl: './watchlater-harte.component.html',
  styleUrl: './watchlater-harte.component.scss'
})
export class WatchlaterHarteComponent implements OnInit {
  savedImages: any[] = [];

  constructor(
    private watchlater: WhatchlaterHarteService,
    private cartService: CartService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    const userEmail = this.authService.getUserEmail();
    if (userEmail) {
      this.watchlater.loadSavedImages(userEmail);
    }
    this.loadSavedImages();
    AOS.init({
      // Settings that can be overridden on per-element basis, by `data-aos-*` attributes:
      offset: 120, // offset (in px) from the original trigger point
      delay: 0, // values from 0 to 3000, with step 50ms
      duration: 900, // values from 0 to 3000, with step 50ms
      easing: 'ease', // default easing for AOS animations
      once: false, // whether animation should happen only once - while scrolling down
      mirror: false, // whether elements should animate out while scrolling past them
      anchorPlacement: 'top-bottom', // defines which position of the element regarding to window should trigger the animation

    });
  }

  loadSavedImages(): void {
    try {
      this.savedImages = this.watchlater.getSavedImages();
    } catch (error) {
      console.error('Error loading saved images:', error);
    }
  }

  removeImage(index: number): void {
    try {
      this.watchlater.removeImage(index);
      this.loadSavedImages();
    } catch (error) {
      console.error('Error removing image:', error);
    }
  }

  addToCart(product: Iproduct): void {
    this.cartService.addToCart(product);
  }


}




