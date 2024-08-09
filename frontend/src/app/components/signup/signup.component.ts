import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../service/auth/auth.service';
import { CommonModule } from '@angular/common';




@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [RouterLink, FormsModule, CommonModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService,) { }

  signupWithEmail() {
     this.authService.signupWithEmail(this.email, this.password)
     }

  // Sign up with Google
  signupWithGoogle() {
    this.authService.signupWithGoogle()
  }
}
