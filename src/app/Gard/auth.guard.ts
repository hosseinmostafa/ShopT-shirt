import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const token = localStorage.getItem('authToken'); // التحقق من وجود token

  if (token) {
    return true; // السماح بالوصول إذا كان هناك token
  } else {
    router.navigate(['/login']); // إعادة التوجيه إلى صفحة تسجيل الدخول إذا لم يكن هناك token
    return false;
  }
};
