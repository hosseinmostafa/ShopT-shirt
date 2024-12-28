import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss'
})
export class NavComponent implements OnInit{
  showAlert: boolean = true;
  message: string = 'Sign up and get 20% off to your first order 🎉';
  button: string = 'Sign Up Now';

  constructor() { }

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
    this.showAlert = false;
  }
}
