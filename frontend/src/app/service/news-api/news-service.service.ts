import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from '../../../environments/environment';

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

  constructor(private http: HttpClient) {
    console.log(environment.apiUrlNews);
  }


  getNewsAndSummary(): Observable<NewsAndSummary> {
    const idToken = localStorage.getItem('firebaseToken'); 
    const headers = new HttpHeaders({
      Authorization: `${idToken}`,
    });

    return this.http.get<NewsAndSummary>(`${environment.apiUrlNews}/news-and-summary`, { headers });
  }

  getDummyData(): Observable<NewsAndSummary> {
    const idToken = localStorage.getItem('firebaseToken');
    const headers = new HttpHeaders({
      Authorization: `${idToken}`,
    });

    return this.http.get<NewsAndSummary>(`${environment.apiUrlNews}/news-and-summary/dummy-data`, { headers });
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
