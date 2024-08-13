import { inject } from '@angular/core';
import { Router, Route, UrlSegment } from '@angular/router';

export function authGuard(
  route: Route,
  segments: UrlSegment[]
): boolean {
  const isBrowser = typeof window !== 'undefined';
  const token = isBrowser ? localStorage.getItem('token') : null;
  const url = '/' + segments.map(segment => segment.path).join('/');

  if (token) {
    if (url === '/login' || url === '/signup') {
      const router = inject(Router);
      router.navigate(['/']); // Redirect to home page
      return false;
    }
    return true; // Allow access to protected routes
  } else {
    if (url !== '/login' && url !== '/signup') {
      const router = inject(Router);
      router.navigate(['/login']); // Redirect to login page
      return false;
    }
    return true; // Allow access to login/signup pages
  }
}
