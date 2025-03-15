import { Component, HostListener, OnInit } from '@angular/core';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{
  brandCount1: number = 0;
  brandCount2: number = 0;
  brandCount3: number = 0;

  ngOnInit(): void {
    this.startCounters();
  }

  startCounters(): void {
    this.animateValue(0, 100, 2000, (value) => (this.brandCount1 = value));
    this.animateValue(0, 400, 2000, (value) => (this.brandCount2 = value));
    this.animateValue(0, 90, 2000, (value) => (this.brandCount3 = value));
  }

  animateValue(start: number, end: number, duration: number, callback: (value: number) => void): void {
    let startTimestamp: number | null = null;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const value = Math.floor(progress * (end - start) + start);
      callback(value);
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }

  
  showAlert: boolean = true;

  hideMessage() {
    this.showAlert = false;

  
    document.querySelector('.navbar')?.classList.add('no-alert');
    document.querySelector('body')?.classList.add('no-alert');
    document.querySelector('.home-page')?.classList.add('no-alert');
  }

}
