import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, Subject } from 'rxjs';
import { environment } from '../../../environments/environment.prod';
import { NewsDataService } from '../localData/news-data.service';
import { TokenService } from '../token/token.service';


interface Article {
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

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  private articlesCache: Article[] | null = null;
  private summaryCache: any | null = null;

  constructor(private http: HttpClient, private newsDataService: NewsDataService, private token: TokenService) {}

  clearCache(): void {
    this.articlesCache = null;
    this.summaryCache = null;
  }

  getNewsArticles(token: string): Observable<any[]> {
    const storedNews = this.newsDataService.getNewsArticles();
    if (storedNews) {
      this.articlesCache = storedNews;
      return of(this.articlesCache);
    }

    if (this.articlesCache) {
      return of(this.articlesCache);
    }

    const headers = new HttpHeaders().set('Authorization', `${token}`);
    return new Observable(observer => {
      this.http.get<Article[]>(`${environment.apiUrlNews}/news-articles`, { headers })
        .subscribe({
          next: (news) => {
            this.articlesCache = news;
            this.newsDataService.setNewsArticles(JSON.stringify(news));
            observer.next(news);
            observer.complete();
          }
        });
    });
  }

  getNewsSummary(token: string): Observable<any> {
    const storedSummary = this.newsDataService.getNewsSummary();
    console.log('Stored summary:', storedSummary);
    
    if (storedSummary) {
      this.summaryCache = storedSummary;
      return of(storedSummary);
    }

    if (this.summaryCache) {

      return of(this.summaryCache);
    }

    const headers = new HttpHeaders().set('Authorization', `${token}`);
    return new Observable(observer => {
      this.http.get<any[]>(`${environment.apiUrlNews}/news-summary/`, { headers })
        .subscribe(
          summary => {
            this.summaryCache = summary;
            this.newsDataService.setNewsSummary(JSON.stringify(summary));
            observer.next(summary);
            observer.complete();
          },
          error => {
            observer.error(error);
          }
        );
    });
  }
}
