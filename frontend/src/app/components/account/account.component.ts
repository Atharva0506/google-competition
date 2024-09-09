import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../service/auth/auth.service'; 
import { ToastrService } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './account.component.html',
  styleUrl: './account.component.css'
})
export class AccountComponent {
  userEmail: string = '';
  oldPassword: string = '';
  newPassword: string = '';
  isEditingEmail: boolean = false;
  isGoogleUser: boolean = false;

  constructor(private authService: AuthService,private toastr:ToastrService,private router:Router) {}

  ngOnInit(): void {
    this.authService.currentUser$.subscribe((user) => {
      if (user) {
        this.userEmail = user.email || '';
        this.isGoogleUser = user.providerData.some(
          (provider) => provider.providerId === 'google.com'
        );
      }
    });
  }

  toggleEmailEdit() {
    if (this.isEditingEmail) {
      this.authService.updateEmail(this.userEmail).catch((error) => {
        this.toastr.error('Error updating email:', error);
      });
    }
    this.isEditingEmail = !this.isEditingEmail;
  }

  changePassword() {
    this.authService
      .changePassword(this.oldPassword, this.newPassword)
      .then(() => {
        this.toastr.success('Password changed successfully!');
        this.router.navigate(['/'])
      })
      .catch((error) => {
        this.toastr.error('Error changing password:', error);
      });
  }
}
