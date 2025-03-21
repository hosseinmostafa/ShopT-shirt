import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const roleGuard: CanActivateFn = (route, state) => {
  const router = inject(Router); // حقن Router
  const expectedRole = route.data['expectedRole']; // الدور المتوقع من البيانات المرتبطة بالمسار
  const userRole = localStorage.getItem('role'); // الدور الحالي للمستخدم

  if (userRole === expectedRole) {
    return true; // السماح بالوصول إذا كان الدور مطابقًا
  } else {
    router.navigate(['/home']); // إعادة التوجيه إلى الصفحة الرئيسية إذا لم يكن الدور مطابقًا
    return false;
  }
};


