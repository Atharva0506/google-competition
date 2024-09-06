import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../service/auth/auth.service';
import { NewsServiceService } from '../../service/news-api/news-service.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  isSidebarOpen = false;

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
    this.newsService.refreshData();
    this.toaster.show('Data refreshed'); 
  }
}
