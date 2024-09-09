import { Component } from '@angular/core';
import { AuthService } from '../../service/auth/auth.service';

import { ToastrService } from 'ngx-toastr';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-forget-password',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.css'
})
export class ForgetPasswordComponent {
  email: string = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  async resetPassword(form: NgForm) {
    if (form.invalid) {
      return;
    }
    
    try {
      await this.authService.resetPassword(this.email);
      this.toastr.success('Password reset email sent!', 'Success');
      this.router.navigate(['/login']);
    } catch (error : any) {
      this.toastr.error(error.message, 'Error');
    }
  }
}
