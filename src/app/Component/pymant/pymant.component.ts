import { Component } from '@angular/core';
import { USERModul } from '../login/usermodul';
import { Iproduct } from '../interface/Iproduct';
import { CartService } from '../../Service/cart.service';
import { UserService } from '../../Service/user.service';
import { SharedService } from '../../Service/shared.service';

@Component({
  selector: 'app-pymant',
  templateUrl: './pymant.component.html',
  styleUrl: './pymant.component.scss'
})
export class PymantComponent {
  userModel: USERModul = new USERModul('', '', '', '', true, '', '', '', '');
  products: Iproduct[] = [];
  totalPrice: number = 0;

  constructor(
    private userService: UserService,
    private cartService: CartService,
    private sharedService: SharedService
  ) { }

  ngOnInit(): void {
    this.products = this.cartService.getCartItems();
    this.totalPrice = this.sharedService.getTotalPrice();
  }

  getTotal(): number {
    return this.totalPrice;
  }
}