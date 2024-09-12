import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../service/auth/auth.service';
import { NewsServiceService } from '../../service/news-api/news-service.service';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit, OnDestroy {
  isSidebarOpen = false;
  loading = false;
  private loadingSubscription: Subscription | null = null;

  constructor(
    private router: Router,
    private toaster: ToastrService,
    private authService: AuthService,
    private newsService: NewsServiceService
  ) { }

  ngOnInit(): void {
  
    this.loadingSubscription = this.newsService.loading$.subscribe(
      (isLoading) => {
        this.loading = isLoading;
      }
    );
  }

  ngOnDestroy(): void {
  
    if (this.loadingSubscription) {
      this.loadingSubscription.unsubscribe();
    }
  }

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  onLogOut() {
    this.authService.signOut();
  }

  onRefresh() {
    // Trigger data refresh
    this.newsService.refreshData().subscribe({
      next: () => {
        this.toaster.success('Data refreshed');
      },
      error: () => {
        this.toaster.error('Failed to refresh data');
      }
    
    });
  }
}
