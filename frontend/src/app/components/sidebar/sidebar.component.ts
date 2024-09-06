import { Component, OnInit } from '@angular/core';
import { NewsServiceService, NewsArticle } from '../../service/news-api/news-service.service';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { FooterBtnComponent } from '../footer-btn/footer-btn.component';
import { LoaderComponent } from '../loader/loader.component';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, FooterBtnComponent, LoaderComponent],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  items: NewsArticle[] = [];
  loading$ = this.newsService.loading$;

  constructor(private newsService: NewsServiceService, private toastr: ToastrService) {}

  ngOnInit(): void {
    this.newsService.data$.subscribe({
      next: (data) => {
        if (data) {
          this.items = data.news;
        }
      },
      error: (err) => {
        this.toastr.error('Error fetching news articles');
        console.error('Error fetching news:', err);
      },
    });

    // Trigger the initial load of data
    this.newsService.loadData();
  }
}
