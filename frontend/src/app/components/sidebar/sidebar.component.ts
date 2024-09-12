import { Component, OnInit, OnDestroy } from '@angular/core';
import { NewsServiceService, NewsArticle } from '../../service/news-api/news-service.service';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { FooterBtnComponent } from '../footer-btn/footer-btn.component';
import { LoaderComponent } from '../loader/loader.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, FooterBtnComponent, LoaderComponent],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit, OnDestroy {
  items: NewsArticle[] = [];
  loading$ = this.newsService.loading$;
  skeletonArray = Array(5).fill(0); 
  private dataSubscription: Subscription | null = null;

  constructor(private newsService: NewsServiceService, private toastr: ToastrService) {}

  ngOnInit(): void {
    this.dataSubscription = this.newsService.data$.subscribe({
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

    this.newsService.loadData(); 
  }

  ngOnDestroy(): void {
    this.dataSubscription?.unsubscribe();
  }
}
