import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './Component/home/home.component';
import { ShopComponent } from './Component/shop/shop.component';
import { CartComponent } from './Component/cart/cart.component';
import { LoginComponent } from './Component/login/login.component';
import { ProductDetailsComponent } from './Component/product-details/product-details.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  { path: 'shop', component: ShopComponent},
  { path: 'cart', component: CartComponent},
  { path: 'login', component: LoginComponent},
  { path: 'product-details/:id', component: ProductDetailsComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
