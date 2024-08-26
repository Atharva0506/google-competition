import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../service/auth/auth.service';
import { NewsDataService } from '../../service/localData/news-data.service';
import { TokenService } from '../../service/token/token.service';
import { DataService } from '../../service/DataUpdate/data-update.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'] 
})
export class NavbarComponent   {
  isSidebarOpen = false;

  constructor(private router: Router, private toaster: ToastrService, private authService: AuthService, private newsData: NewsDataService,private token:TokenService,private dataService: DataService) { }
  
  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  onLogOut() {
    this.authService.signOut()
  }
  onRefresh() {
    this.newsData.clearNewsArticles();
    this.newsData.clearNewsSummary();
    this.dataService.emitDataUpdated();
  }
}
