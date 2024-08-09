import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { CommonModule, DOCUMENT } from '@angular/common';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    const token = localStorage.getItem('token');

    // Redirect authenticated users from login/signup to home
    if (token) {
      if (state.url === '/login' || state.url === '/signup') {
        this.router.navigate(['/']); // Redirect to home page
        return false;
      }
      return true; // Allow access to protected routes
    } else {
      // Redirect unauthenticated users from protected routes to login
      if (state.url !== '/login' && state.url !== '/signup') {
        this.router.navigate(['/login']); // Redirect to login page
        return false;
      }
      return true; // Allow access to login/signup pages
    }
  }
}
