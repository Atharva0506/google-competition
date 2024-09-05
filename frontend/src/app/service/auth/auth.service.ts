// auth.service.ts
import { Injectable, inject } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, signInWithEmailAndPassword, UserCredential, onAuthStateChanged, signOut, User } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private firebaseAuth = inject(Auth);
  private currentUserSubject: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);
  public currentUser$: Observable<User | null> = this.currentUserSubject.asObservable();

  constructor(private router: Router, private toastr: ToastrService) {
  
    onAuthStateChanged(this.firebaseAuth, (user) => {
      this.currentUserSubject.next(user);
      if (user) {
      
        this.refreshToken();
      } else {
        localStorage.removeItem('firebaseToken');
      }
    });
  }

  // ============================= Sign UP  ====================================== //
  signupWithEmail(email: string, password: string): Promise<void> {
    return createUserWithEmailAndPassword(this.firebaseAuth, email, password)
      .then(async (userCredential) => {
        await this.handleUserCredential(userCredential);
        this.router.navigate(['/details']);
      })
      .catch((error) => {
        this.toastr.error(error.message);
        throw error;
      });
  }

  // Signup with Google
  signupWithGoogle(): Promise<void> {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(this.firebaseAuth, provider)
      .then(async (userCredential) => {
        await this.handleUserCredential(userCredential);
        this.router.navigate(['/details']);
      })
      .catch((error) => {
        this.toastr.error(error.message);
        throw error;
      });
  }

  // ============================= Sign IN  ====================================== //
  signInWithEmail(email: string, password: string): Promise<UserCredential> {
    return signInWithEmailAndPassword(this.firebaseAuth, email, password)
      .then(async (userCredential) => {
        await this.handleUserCredential(userCredential);
        this.toastr.success('Successfully logged in');
        this.router.navigate(['/']);
        return userCredential;
      })
      .catch((error) => {
        this.toastr.error(error.message);
        throw error;
      });
  }

  signInWithGoogle(): Promise<UserCredential> {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(this.firebaseAuth, provider)
      .then(async (userCredential) => {
        await this.handleUserCredential(userCredential);
        this.toastr.success('Successfully logged in with Google');
        this.router.navigate(['/']);
        return userCredential;
      })
      .catch((error) => {
        this.toastr.error(error.message);
        throw error;
      });
  }

  // ============================= Sign Out  ====================================== //
  signOut(): Promise<void> {
    return signOut(this.firebaseAuth)
      .then(() => {
        localStorage.removeItem('firebaseToken'); // Clear token on logout
        this.toastr.info('Successfully logged out');
        this.router.navigate(['/login']);
      })
      .catch((error) => {
        this.toastr.error('Error logging out:', error.message);
        throw error;
      });
  }

  // ============================= Token Handling ====================================== //


  private refreshToken(): void {
    const user = this.firebaseAuth.currentUser;
    if (user) {
      user.getIdToken(true).then((token) => {
        localStorage.setItem('firebaseToken', token);
      }).catch((error) => {
        console.error('Error refreshing token:', error);
        this.toastr.error('Error refreshing session. Please log in again.');
        this.signOut();
      });
    }
  }


  private async handleUserCredential(userCredential: UserCredential): Promise<void> {
    const token = await userCredential.user.getIdToken();
   
    localStorage.setItem('firebaseToken', ("Bearer  " +token));
  }

  getFirebaseToken(): string | null {
    return localStorage.getItem('firebaseToken');
  }
}
