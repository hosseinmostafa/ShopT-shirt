import { Component, OnInit } from '@angular/core';
import { WhatchlaterHarteService } from '../../Service/whatchlater-harte.service';
import { Iproduct } from '../interface/Iproduct';
import { CartService } from '../../Service/cart.service';
import { AuthService } from '../../Service/auth.service';

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




