import { inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../Service/auth.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard {
  constructor(private authService: AuthService, private router: Router) { }

  canActivate(router: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
    if (this.authService.isAuthenticatedd()) {
      return true;
    } else {
      this.authService.redirectUrl = state.url;
      this.router.navigate(['/login']);
      return false;
    }
  }
}

export const authGuardGuard: CanActivateFn = (router, state) => {
  return inject(AuthGuard).canActivate(router, state);
}
