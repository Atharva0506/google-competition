import { Component, OnInit, OnDestroy } from '@angular/core';
import { LoaderComponent } from '../../components/loader/loader.component';
import { CommonModule } from '@angular/common';
import { MarkdownComponent } from 'ngx-markdown';
import { NewsServiceService } from '../../service/news-api/news-service.service';
import { ToastrService } from 'ngx-toastr';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from '../../service/auth/auth.service';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [LoaderComponent, CommonModule, MarkdownComponent],
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent implements OnInit, OnDestroy {
  summary: string = '';
  loading$: Observable<boolean>;
  private authSubscription: Subscription | null = null;
  private loadingSubscription: Subscription | null = null; // Add this line

  constructor(
    private newsService: NewsServiceService,
    private toastr: ToastrService,
    private authService: AuthService
  ) {
    this.loading$ = this.newsService.loading$;
  }

  ngOnInit(): void {
    // Subscribe to loading$ to log its value
    this.loadingSubscription = this.loading$.subscribe(loading => {
      console.log('Loading state:', loading);
    });

    // Subscribe to currentUser$ to load data
    this.authSubscription = this.authService.currentUser$.subscribe(user => {
      if (user) {
        this.newsService.loadData();
      }
    });

    this.loadSummary();
  }

  ngOnDestroy(): void {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
    if (this.loadingSubscription) {
      this.loadingSubscription.unsubscribe(); // Ensure you unsubscribe here
    }
  }

  loadSummary(): void {
    this.newsService.data$.subscribe(data => {
      if (data) {
        this.summary = this.preprocessText(data.summary);
      }
    });
  }

  preprocessText(text: string): string {
    return text.replace(/\n\n/g, '<br><br>');
  }
}