import { Component, OnDestroy } from '@angular/core';
import { FooterService } from '../../Service/footer.service';
import { Subscription } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent implements OnDestroy {
  showFooter: boolean = true;
  showWelcomeMessage: boolean = false;
  subscription: Subscription;
  welcomeSubscription: Subscription;

  constructor(private footerService: FooterService) {
    this.subscription = this.footerService.showFooter.subscribe((value) => {
      this.showFooter = value;
    });

    this.welcomeSubscription = this.footerService.showWelcomeMessage.subscribe((value) => {
      this.showWelcomeMessage = value;
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.welcomeSubscription.unsubscribe();
    this.footerService.displayFooter();
    this.footerService.hideWelcome();
  }
}