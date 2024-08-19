import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {  Observable, of } from 'rxjs';
import { environment } from '../../../environments/environment.prod';
import { NewsDataService } from '../localData/news-data.service';

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
  private articles: Article[] = [];
  private links: string[] = [];

  constructor(private http: HttpClient,private newsDataService: NewsDataService) {}


  // Get News Articles
  getNewsArticles(token: string): Observable<any[]> {
    const storedNews = this.newsDataService.getNewsArticles();
    if (storedNews) {
      return of(storedNews); 
    }
    const headers = new HttpHeaders().set('Authorization', `${token}`);
    return new Observable(observer => {
      this.http.get<Article[]>(`${environment.apiUrlNews}/news-articles`, { headers })
        .subscribe(news => {
          this.newsDataService.setNewsArticles(JSON.stringify(news)); // Store the news in local storage
          observer.next(news); // Emit the news articles
          observer.complete(); // Complete the observable
        });
    });
  }
  
  refreshNews(token: string): Observable<Article[]> {
    const headers = new HttpHeaders().set('Authorization', `${token}`);

    return new Observable(observer => {
      this.http.get<Article[]>(`${environment.apiUrlNews}/news-articles`, { headers })
        .subscribe(news => {
          this.newsDataService.setNewsArticles(JSON.stringify(news)); // Update the local storage
          observer.next(news); // Emit the fresh news articles
          observer.complete(); // Complete the observable
        });
    });
  }
  // Get Summary
  getNewsSummary(token: string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `${token}`);
    return this.http.get<any[]>(`${environment.apiUrlNews}/news-summary/`, { headers })
  }
 
}
