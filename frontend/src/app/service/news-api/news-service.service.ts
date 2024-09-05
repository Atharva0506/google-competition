import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, from, of } from 'rxjs';
import { switchMap, catchError } from 'rxjs/operators';  // Import operators
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
  providedIn: 'root'
})
export class NewsServiceService {
  private cachedSummary: string | null = null;
  private cachedNews: NewsArticle[] | null = null;

  constructor(private http: HttpClient, private authService: AuthService) {
   
  }

  private getAuthHeaders(): Observable<HttpHeaders> {
    return from(this.authService.getFirebaseToken()).pipe(
      switchMap(token => {
        const headers = new HttpHeaders({
          Authorization: `${token}`
        });
        return of(headers);
      }),
      catchError(() => {
        // Handle token retrieval errors
        return of(new HttpHeaders());  // Return empty headers or handle accordingly
      })
    );
  }

  getNewsAndSummary(): Observable<NewsAndSummary> {
    return this.getAuthHeaders().pipe(
      switchMap(headers => 
        this.http.get<NewsAndSummary>(`${environment.apiUrlNews}/news-and-summary`, { headers })
      ),
      catchError(error => {
        console.error('Error fetching news and summary:', error);
        return of({ summary: '', news: [] });  // Return empty data or handle accordingly
      })
    );
  }

  getDummyData(): Observable<NewsAndSummary> {
    return this.getAuthHeaders().pipe(
      switchMap(headers =>
        this.http.get<NewsAndSummary>(`${environment.apiUrlNews}/news-and-summary/dummy-data`, { headers })
      ),
      catchError(error => {
        console.error('Error fetching dummy data:', error);
        return of({ summary: '', news: [] });  // Return empty data or handle accordingly
      })
    );
  }

  saveSummaryToLocalStorage(summary: string): void {
    this.cachedSummary = summary;
    localStorage.setItem('summary', summary);
  }

  saveNewsArticlesToLocalStorage(news: NewsArticle[]): void {
    this.cachedNews = news;
    localStorage.setItem('newsArticles', JSON.stringify(news));
  }

  getSummary(): string | null {
    if (this.cachedSummary) {
      return this.cachedSummary;
    }

    const summary = localStorage.getItem('summary');
    if (summary) {
      this.cachedSummary = summary;
    }
    return summary;
  }

  getNewsArticles(): NewsArticle[] | null {
    if (this.cachedNews) {
      return this.cachedNews;
    }
   
    const data = localStorage.getItem('newsArticles');
    if (data) {
      this.cachedNews = JSON.parse(data);
    }
    return this.cachedNews;
  }
}
