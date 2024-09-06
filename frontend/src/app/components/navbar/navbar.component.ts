import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../service/auth/auth.service';
import { NewsServiceService } from '../../service/news-api/news-service.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  isSidebarOpen = false;
  loading = false;

  constructor(
    private router: Router,
    private toaster: ToastrService,
    private authService: AuthService,
    private newsService: NewsServiceService
  ) {}

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  onLogOut() {
    this.authService.signOut();
  }

  onRefresh() {
    this.loading = true;
    this.newsService.refreshData().subscribe({
      next: () => {
        // this.toaster.show('Data refreshed');
      },
      error: () => {
        this.toaster.error('Failed to refresh data');
      },
      complete: () => {
        this.loading = false;
      }
    });
  }
}
