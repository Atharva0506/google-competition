import { HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  UserCredential,
  onAuthStateChanged,
  signOut,
  User
} from '@angular/fire/auth';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, from, Observable, of } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private firebaseAuth = inject(Auth);
  private currentUserSubject: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);
  public currentUser$: Observable<User | null> = this.currentUserSubject.asObservable();

  constructor(private router: Router, private toastr: ToastrService) {
    this.initializeAuthStateListener();
  }

  private initializeAuthStateListener() {
   
    onAuthStateChanged(this.firebaseAuth, (user) => {
      this.currentUserSubject.next(user);
      if (user) {
        this.saveUserToLocalStorage(user);
      } else {
        this.removeFromLocalStorage('userDetails');
      }
    });
  }

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

  signOut(): Promise<void> {
    return signOut(this.firebaseAuth)
      .then(() => {
        this.removeFromLocalStorage('userDetails');
        localStorage.removeItem("newsArticles")
        localStorage.removeItem("summary")
        this.currentUserSubject.next(null); 
        this.toastr.info('Successfully logged out');
        this.router.navigate(['/login']);
      })
      .catch((error) => {
        this.toastr.error('Error logging out:', error.message);
        throw error;
      });
  }

  // ============================= Token Handling ====================================== //
  getFirebaseToken(): Promise<string | null> {
    const user = this.currentUserSubject.value; 
    if (user) {
      return user.getIdToken().then(token => {
        if(token == null){
          console.log("Token is Null :(")
        }
        return "Bearer " + token;
      }).catch(error => {
        console.error('Error getting token:', error);
        return null;
      });
    }
    console.warn("No current user found."); 
    return Promise.resolve(null);
  }

  getAuthHeaders(): Observable<HttpHeaders> {
    return from(this.getFirebaseToken()).pipe(
      switchMap(token => {
        if (!token) {
          console.warn("Token is null, creating empty headers."); 
          return of(new HttpHeaders()); 
        }
        const headers = new HttpHeaders({
          Authorization: `${token}`
        });
        return of(headers);
      }),
      catchError(error => {
        console.error("Error in getAuthHeaders:", error);
        return of(new HttpHeaders()); 
      })
    );
  }

  private async handleUserCredential(userCredential: UserCredential): Promise<void> {
    const user = userCredential.user;
    this.currentUserSubject.next(user); 
    this.saveUserToLocalStorage(user);
  }

  getUserDetailsFromLocalStorage(): User | null {
    const userDetails = this.getFromLocalStorage('userDetails');
    return userDetails ? JSON.parse(userDetails) : null;
  }

  private saveUserToLocalStorage(user: User): void {
    if (this.isBrowser()) {
      const userDetails = {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName
      };
      localStorage.setItem('userDetails', JSON.stringify(userDetails));
    }
  }

  private removeFromLocalStorage(key: string): void {
    if (this.isBrowser()) {
      localStorage.removeItem(key);
    }
  }

  private getFromLocalStorage(key: string): string | null {
    if (this.isBrowser()) {
      return localStorage.getItem(key);
    }
    return null;
  }

  private isBrowser(): boolean {
    return typeof window !== 'undefined' && typeof localStorage !== 'undefined';
  }
}
