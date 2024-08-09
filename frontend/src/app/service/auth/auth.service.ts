
import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider,signInWithEmailAndPassword, UserCredential } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private auth: Auth,private router:Router,private toastr:ToastrService) {}

  // ============================= Sign UP  ====================================== //
  signupWithEmail(email: string, password: string) {
    return createUserWithEmailAndPassword(this.auth, email, password)
      .then(async (userCredential) => {
        const user = userCredential.user;
        const token = await user.getIdToken();
        // Store the token in local storage
        localStorage.setItem('token', token);
        this.router.navigate(['/'])
      })
      .catch((error) => {
        this.toastr.error( error.message);
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
        localStorage.setItem('token', token);
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
      .then((userCredential) => {
        localStorage.setItem('token', userCredential.user.refreshToken);
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
      .then((userCredential) => {
        localStorage.setItem('token', userCredential.user.refreshToken);
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
        localStorage.removeItem('token');
        this.toastr.info('Successfully logged out');
        this.router.navigate(['/login']); 
      })
      .catch((error) => {
        this.toastr.error('Error logging out:', error.message);
        throw error;
      });
    }
}
