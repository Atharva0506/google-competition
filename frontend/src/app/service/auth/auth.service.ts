
import { Injectable } from '@angular/core';
import { User, Auth, createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider,signInWithEmailAndPassword, UserCredential } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TokenService } from '../token/token.service';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private auth: Auth, private router: Router, private toastr: ToastrService,private tokenService : TokenService) {
    this.startTokenRefresh();
  }

  private tokenRefreshInterval: any;


  private async startTokenRefresh() {
    this.auth.onAuthStateChanged((user: User | null) => {
      if (user) {
        this.setTokenRefresh(user);
      } else {
        this.clearTokenRefresh();
      }
    });
  }

  private async setTokenRefresh(user: User) {
    // Refresh token every 55 minutes (just before the 1-hour expiration)
    this.tokenRefreshInterval = setInterval(async () => {
      const token = await user.getIdToken(true);
      localStorage.setItem('token', "Bearer " + token);
    }, 55 * 60 * 1000);
  }

  private clearTokenRefresh() {
    if (this.tokenRefreshInterval) {
      clearInterval(this.tokenRefreshInterval);
    }
  }


  // ============================= Sign UP  ====================================== //
  signupWithEmail(email: string, password: string) {
    return createUserWithEmailAndPassword(this.auth, email, password)
      .then(async (userCredential) => {
        const user = userCredential.user;
        const token = await user.getIdToken();
        // Store the token in local storage
        this.tokenService.setToken(token)
        
        this.router.navigate(['/details']);
      })
      .catch((error) => {
        this.toastr.error(error.message);
        throw error;
      });
  }
  
  // Signup with Google
  signupWithGoogle() {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(this.auth, provider)
      .then(async(userCredential) => {
        const user = userCredential.user;
        const token = await user.getIdToken();
        this.tokenService.setToken(token)
        this.router.navigate(['/details'])
      })
      .catch((error) => {
        this.toastr.error(error.message);
        throw error;
      });
  }
// ============================= Sign IN  ====================================== //
  signInWithEmail(email: string, password: string): Promise<UserCredential> {
    return signInWithEmailAndPassword(this.auth, email, password)
      .then(async(userCredential) => {
        const token = await userCredential.user.getIdToken();
        this.tokenService.setToken(token)
        this.toastr.success('Successfully logged in');
        this.router.navigate(['/'])
        return userCredential;
      })
      .catch((error) => {
        this.toastr.error( error.message);
        throw error;
      });
  }

  // Sign in with Google
  signInWithGoogle(): Promise<UserCredential> {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(this.auth, provider)
      .then(async (userCredential) => {
        const token = await userCredential.user.getIdToken();
        this.tokenService.setToken(token)
        this.toastr.success('Successfully logged in with Google');
        this.router.navigate(['/'])
        return userCredential;
      })
      .catch((error) => {
        this.toastr.error(error.message);
        throw error;
      });
  }

  // Sign out method
  signOut(): Promise<void> {
    return this.auth.signOut()
      .then(() => {
        this.tokenService.clearToken()
        this.toastr.info('Successfully logged out');
        this.router.navigate(['/login']); 
      })
      .catch((error) => {
        this.toastr.error('Error logging out:', error.message);
        throw error;
      });
    }
}
