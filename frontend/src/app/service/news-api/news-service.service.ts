import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { switchMap, catchError, tap, shareReplay } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { AuthService } from '../auth/auth.service';

export interface NewsArticle {
  title: string;
  description: string;
  content: string;
  url: string;
  image: string;
  publishedAt: string;
  source: {
    name: string;
    url: string;
  };
}

export interface NewsAndSummary {
  summary: string;
  news: NewsArticle[];
}
@Injectable({
  providedIn: 'root',
})
export class NewsServiceService {
  private dataSubject = new BehaviorSubject<NewsAndSummary | null>(null);
  private loadingSubject = new BehaviorSubject<boolean>(false);
  private isFetching = false;

  public data$ = this.dataSubject.asObservable();
  public loading$ = this.loadingSubject.asObservable();

  constructor(private http: HttpClient, private authService: AuthService) {
    this.loadData();
  }

  loadData(): void {
    // Emit the current loading state
    this.loadingSubject.next(this.isFetching);

    const cachedSummary = this.getSummary();
    const cachedNews = this.getNewsArticles();

    if (cachedSummary && cachedNews) {
      this.dataSubject.next({ summary: cachedSummary, news: cachedNews });
      this.loadingSubject.next(false); 
    } else {
      this.fetchData(); 
    }
  }

  private fetchData(isForced: boolean = false): void {
    if (this.isFetching && !isForced) return;
    this.isFetching = true;
    this.loadingSubject.next(true);

    const apiUrl = `${environment.apiUrlNews}/news-and-summary/dummy-data`;

    this.authService
      .getAuthHeaders()
      .pipe(
        switchMap((headers) => this.http.get<NewsAndSummary>(apiUrl, { headers })),
        tap((data) => {
          this.saveSummaryToLocalStorage(data.summary);
          this.saveNewsArticlesToLocalStorage(data.news);
          this.dataSubject.next(data);
          this.isFetching = false;
          this.loadingSubject.next(false);
        }),
        catchError((error) => {
          console.error('Error fetching news and summary:', error);
          this.isFetching = false;
          this.loadingSubject.next(false);
          return of({ summary: '', news: [] });
        }),
        shareReplay(1)
      )
      .subscribe();
  }

  public refreshData(): void {
    this.fetchData(true); 
  }

  private saveSummaryToLocalStorage(summary: string): void {
    if (this.isBrowser()) {
      localStorage.setItem('summary', summary);
    }
  }

  private saveNewsArticlesToLocalStorage(news: NewsArticle[]): void {
    if (this.isBrowser()) {
      localStorage.setItem('newsArticles', JSON.stringify(news));
    }
  }

  getSummary(): string | null {
    if (this.isBrowser()) {
      return localStorage.getItem('summary');
    }
    return null;
  }

  getNewsArticles(): NewsArticle[] | null {
    if (this.isBrowser()) {
      const data = localStorage.getItem('newsArticles');
      return data ? JSON.parse(data) : null;
    }
    return null;
  }

  private isBrowser(): boolean {
    return typeof window !== 'undefined' && typeof localStorage !== 'undefined';
  }
}