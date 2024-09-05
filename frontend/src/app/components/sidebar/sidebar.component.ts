import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { LoaderComponent } from '../loader/loader.component';
import { FooterBtnComponent } from '../footer-btn/footer-btn.component';
import { NewsServiceService } from '../../service/news-api/news-service.service';



@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [DatePipe,CommonModule,LoaderComponent, FooterBtnComponent],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent implements OnInit {
  items: any[] = [];
  loading: boolean = true;
  constructor(private newsService: NewsServiceService) { }

  ngOnInit(): void {
    this.loadNewsArticles();
  }

  loadNewsArticles(): void {
    const newsArticles = this.newsService.getNewsArticlesFromLocalStorage();
    
    if (newsArticles) {
      this.items = newsArticles;
      this.loading = false;
    } else {
      console.log("No news articles found in local storage.");
      this.fetchAndStoreNews();
    }
  }

  fetchAndStoreNews(): void {
    this.newsService.getDummyData().subscribe({
      next: (response) => {
        const articles = response.news;
        this.newsService.saveNewsArticlesToLocalStorage(articles);
        this.items = articles;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching news:', err);
        this.loading = false;
      }
    });
  }
}
