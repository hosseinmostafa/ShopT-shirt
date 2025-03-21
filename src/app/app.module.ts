import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './Component/footer/footer.component';
import { NavComponent } from './Component/nav/nav.component';
import { HomeComponent } from './Component/home/home.component';
import { ShopComponent } from './Component/shop/shop.component';
import { HttpClient, HttpClientJsonpModule, HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CartComponent } from './Component/cart/cart.component';
import { LoginComponent } from './Component/login/login.component';
import { ProductDetailsComponent } from './Component/product-details/product-details.component';
import { PayServesesInDashpordComponent } from './Component/pay-serveses-in-dashpord/pay-serveses-in-dashpord.component';
import { ErrorPageComponent } from './Component/error-page/error-page.component';
import { WritProblemComponent } from './Component/writ-problem/writ-problem.component';
import { HomeProductDetailsComponent } from './Component/home-product-details/home-product-details.component';
import { WatchlaterHarteComponent } from './Component/watchlater-harte/watchlater-harte.component';
import { SignupComponent } from './Component/signup/signup.component';
import { ToastrModule } from 'ngx-toastr';
import { LucideAngularModule, UserX, ShoppingBasket } from 'lucide-angular';
import { CustomAlertComponent } from './Component/custom-alert/custom-alert.component';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    NavComponent,
    HomeComponent,
    ShopComponent,
    CartComponent,
    LoginComponent,
    ProductDetailsComponent,
    PayServesesInDashpordComponent,
    ErrorPageComponent,
    WritProblemComponent,
    HomeProductDetailsComponent,
    WatchlaterHarteComponent,
    SignupComponent,
    CustomAlertComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 20000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
      progressBar: true,
      progressAnimation: 'increasing',
      closeButton: true,
      easing: 'ease-in',
      easeTime: 300,
      extendedTimeOut: 1000,
      tapToDismiss: true,
      maxOpened: 5,
      autoDismiss: true
    }),
    LucideAngularModule.pick({ UserX }),
    LucideAngularModule.pick({ ShoppingBasket })
  ],

  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
