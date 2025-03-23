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
import { authGuard } from './Gard/auth.guard';
import { roleGuard } from './Gard/role.guard';
import { authGuardGuard } from './Gard/auth.service';
import { PymantComponent } from './Component/pymant/pymant.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'shop', component: ShopComponent},
  { path: 'cart', component: CartComponent, canActivate: [authGuardGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'product-details/:id', component: ProductDetailsComponent, canActivate: [authGuardGuard]},
  { path: "home-product-details/:id", component: HomeProductDetailsComponent, canActivate: [authGuardGuard] },
  { path: 'writ-problem', component: WritProblemComponent },
  { path: 'watchlater-harte', component: WatchlaterHarteComponent, canActivate: [authGuardGuard]},
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'custom-alert', component: CustomAlertComponent},
  { path: 'pymant', component: PymantComponent, canActivate: [authGuardGuard] },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', component: ErrorPageComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
