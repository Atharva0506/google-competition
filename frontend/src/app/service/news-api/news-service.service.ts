import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { switchMap, catchError, tap, finalize, shareReplay } from 'rxjs/operators';
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
    this.authService.currentUser$.subscribe(user => {
      if (user) {
        this.loadData();
      } else {
        this.dataSubject.next(null);
      }
    });
  }

  loadData(): void {
    if (this.isFetching) return;

    this.loadingSubject.next(true);

    const cachedSummary = this.getSummary();
    const cachedNews = this.getNewsArticles();

    if (cachedSummary && cachedNews) {
      this.dataSubject.next({ summary: cachedSummary, news: cachedNews });
      this.loadingSubject.next(false);
    } else {
      this.fetchData().subscribe({
        next: (data) => {
          this.saveSummaryToLocalStorage(data.summary);
          this.saveNewsArticlesToLocalStorage(data.news);
          this.dataSubject.next(data);
        },
        error: (err) => {
          console.error('Error fetching news and summary:', err);
          this.dataSubject.next({ summary: '', news: [] });
        },
        complete: () => {
          this.loadingSubject.next(false);
        },
      });
    }
  }

  private fetchData(isForced: boolean = false): Observable<NewsAndSummary> {
    if (this.isFetching && !isForced) {
      return of({ summary: '', news: [] });
    }

    this.isFetching = true;
    this.loadingSubject.next(true)
    const apiUrl = `${environment.apiUrlNews}/news-and-summary/dummy-data`;

    return this.authService.getAuthHeaders().pipe(
      switchMap((headers) => this.http.get<NewsAndSummary>(apiUrl, { headers })),
      tap((data) => {
        this.saveSummaryToLocalStorage(data.summary);
        this.saveNewsArticlesToLocalStorage(data.news);
        this.dataSubject.next(data);
      }),
      catchError((error) => {
        console.error('Error fetching news and summary:', error);
        return of({ summary: '', news: [] });
      }),
      finalize(() => {
        this.isFetching = false;
        this.loadingSubject.next(false);
      }),
      shareReplay(1)
    );
  }

  public refreshData(): Observable<NewsAndSummary> {
    return this.fetchData(true);
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
