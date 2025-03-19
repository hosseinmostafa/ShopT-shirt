import { Component, OnInit } from '@angular/core';
import { WhatchlaterHarteService } from '../../Service/whatchlater-harte.service';
import { Iproduct } from '../interface/Iproduct';
import { CartService } from '../../Service/cart.service';

@Component({
  selector: 'app-watchlater-harte',
  templateUrl: './watchlater-harte.component.html',
  styleUrl: './watchlater-harte.component.scss'
})
export class WatchlaterHarteComponent implements OnInit {
  savedImages: any[] = [];

  constructor(private watchlater: WhatchlaterHarteService, private cartService: CartService) { }

  ngOnInit(): void {
    this.loadSavedImages();
  }

  loadSavedImages(): void {
    this.savedImages = this.watchlater.getSavedImages();
  }

  removeImage(index: number): void {
    this.watchlater.removeImage(index);
    this.loadSavedImages(); // تحديث القائمة بعد الحذف
  }

    addToCart(product: Iproduct): void {
      this.cartService.addToCart(product);
    }
  
}


