import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './Component/home/home.component';
import { ShopComponent } from './Component/shop/shop.component';
import { CartComponent } from './Component/cart/cart.component';
import { LoginComponent } from './Component/login/login.component';
import { ProductDetailsComponent } from './Component/product-details/product-details.component';
import { ErrorPageComponent } from './Component/error-page/error-page.component';
import { WritProblemComponent } from './Component/writ-problem/writ-problem.component';
import { HomeProductDetailsComponent } from './Component/home-product-details/home-product-details.component';
import { WatchlaterHarteComponent } from './Component/watchlater-harte/watchlater-harte.component';
import { SignupComponent } from './Component/signup/signup.component';
import { CustomAlertComponent } from './Component/custom-alert/custom-alert.component';
import { authGuardGuard } from './Gard/auth.service';
import { PymantComponent } from './Component/pymant/pymant.component';
import { PayServesesInDashpordComponent } from './Component/pay-serveses-in-dashpord/pay-serveses-in-dashpord.component';
import { NewArrivalsComponent } from './Component/new-arrivals/new-arrivals.component';
import { DashboardComponent } from './Component/dashboard/dashboard.component';
import { AnalyticsComponent } from './Component/dashboard/analytics/analytics.component';
import { NewPostComponent } from './Component/dashboard/new-post/new-post.component';
import { NewArrivalsProductdetailsComponent } from './Component/new-arrivals-productdetails/new-arrivals-productdetails.component';
import { SearchComponent } from './Component/search/search.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'shop', component: ShopComponent },
  { path: 'cart', component: CartComponent, canActivate: [authGuardGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'product-details/:id', component: ProductDetailsComponent},
  { path: "home-product-details/:id", component: HomeProductDetailsComponent},
  { path: 'writ-problem', component: WritProblemComponent },
  { path: 'watchlater-harte', component: WatchlaterHarteComponent, canActivate: [authGuardGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'custom-alert', component: CustomAlertComponent },
  { path: 'pymant', component: PymantComponent, canActivate: [authGuardGuard] },
  { path: 'pay-serveses-in-dashpord', component: PayServesesInDashpordComponent },
  { path: 'new-arrivals', component: NewArrivalsComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [authGuardGuard] },
  { path: 'analytics', component: AnalyticsComponent, canActivate: [authGuardGuard] },
  { path: 'new-post', component: NewPostComponent, canActivate: [authGuardGuard] },
  { path: 'new-arrivals-productdetails/:id', component: NewArrivalsProductdetailsComponent},
  { path: 'search', component: SearchComponent},
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', component: ErrorPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
