import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = async (route, state) => {
  const token = localStorage.getItem('token');
  const router = inject(Router);
  if (!token) {
    localStorage.clear();
    return router.createUrlTree(['/auth/login'], {
      queryParams: { returnUrl: state.url },
    });
  }
  try {
    const res = await fetch('https://backend-750705921113.europe-southwest1.run.app/verify', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      localStorage.clear();
      return router.createUrlTree(['/auth/login'], {
        queryParams: { returnUrl: state.url },
      });
    }

    return true;
  } catch (error) {
    localStorage.clear();
    return router.createUrlTree(['/auth/login'], {
      queryParams: { returnUrl: state.url },
    });
  }
};
//
