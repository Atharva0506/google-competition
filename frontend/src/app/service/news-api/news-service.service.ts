import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

interface NewsArticle {
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

  constructor(private http: HttpClient) {
    console.log(environment.apiUrlNews)
  }


  getNewsAndSummary(): Observable<NewsAndSummary> {
    const idToken = localStorage.getItem('firebaseToken'); 
    const headers = new HttpHeaders({
      Authorization: `Bearer ${idToken}`,
    });

    return this.http.get<NewsAndSummary>(`${environment.apiUrlNews}/news-and-summary`, { headers });
  }


  getDummyData(): Observable<NewsAndSummary> {
    const idToken = localStorage.getItem('firebaseToken');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${idToken}`,
    });

    return this.http.get<NewsAndSummary>(`${environment.apiUrlNews}/news-and-summary/dummy-data`, { headers });
  }

 
  saveSummaryToLocalStorage(summary: string): void {
    localStorage.setItem('summary', summary);
  }


  saveNewsArticlesToLocalStorage(news: NewsArticle[]): void {
    localStorage.setItem('newsArticles', JSON.stringify(news));
  }


  getSummaryFromLocalStorage(): string | null {
    return localStorage.getItem('summary');
  }

  getNewsArticlesFromLocalStorage(): NewsArticle[] | null {
    const data = localStorage.getItem('newsArticles');
    return data ? JSON.parse(data) : null;
  }
}
