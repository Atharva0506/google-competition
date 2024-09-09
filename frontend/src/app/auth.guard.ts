import { inject } from '@angular/core';
import { Router, Route, UrlSegment } from '@angular/router';
import { AuthService } from './service/auth/auth.service';

export function authGuard(
  route: Route,
  segments: UrlSegment[]
): boolean {
  const router = inject(Router);
  const authService = inject(AuthService);

  const isBrowser = typeof window !== 'undefined';
  const userDetails = isBrowser ? authService.getUserDetailsFromLocalStorage() : null;

  const url = '/' + segments.map(segment => segment.path).join('/');
  if (url === '/forget-password') {
    return true;
  }

  if (userDetails) {
    // User is logged in
    if (url === '/login' || url === '/signup') {
      router.navigate(['/']);
      return false;
    }
    // Check if the user is trying to access /details without signing up
    if (url === '/details' && !authService.hasUserSignedUp()) {
      router.navigate(['/']);
      return false;
    }
    return true;
  } else {
    // User is not logged in
    if (url !== '/login' && url !== '/signup') {
      router.navigate(['/login']);
      return false;
    }
    return true;
  }
}