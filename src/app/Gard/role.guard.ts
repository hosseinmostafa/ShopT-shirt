import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const roleGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const expectedRole = route.data['expectedRole'];
  const userRole = localStorage.getItem('role');

  if (userRole === expectedRole) {
    return true;
  } else {
    router.navigate(['/home']);
    return false;
  }
};