import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { LoaderComponent } from '../loader/loader.component';
import { FooterBtnComponent } from '../footer-btn/footer-btn.component';
import { NewsServiceService } from '../../service/news-api/news-service.service'; 
import { NewsArticle } from '../../service/news-api/news-service.service'; 
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [DatePipe, CommonModule, LoaderComponent, FooterBtnComponent],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  items: NewsArticle[] = []; 
  loading: boolean = true; 

  constructor(private newsService: NewsServiceService,private toastr:ToastrService) { }

  ngOnInit(): void {
    this.loadNewsArticles(); 
  }

 
  loadNewsArticles(): void {
   
    const cachedNews = this.newsService.getNewsArticles();
    if (cachedNews && cachedNews.length > 0) {
    
      this.items = cachedNews;
      this.loading = false;
    } else {
   
      this.fetchAndStoreNews();
    }
  }

 
  fetchAndStoreNews(): void {
    this.loading = true; 
    this.newsService.getNewsAndSummary().subscribe({
      next: (response) => {
        const articles = response.news;
     
        this.newsService.saveNewsArticlesToLocalStorage(articles);
        this.items = articles; 
        this.loading = false; 
      },
      error: (err) => {
        this.toastr.error(err.message)
        console.error('Error fetching news:', err); 
        this.loading = true; 
      }
    });
  }
}
