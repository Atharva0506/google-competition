import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


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
  private apiUrl = 'http://localhost:3000/api';
  private articles: Article[] = [];
  private links: string[] = [];
  constructor(private http: HttpClient) {
  
  }


  // Get News Articles
  getNewsArticles(token: string): Observable<any[]> {
    const headers = new HttpHeaders().set('Authorization', `${token}`);
    return this.http.get<any[]>(`${this.apiUrl}/news/news-articles`, { headers })
  }

  // Get Summary
  getNewsSummary(token: string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `${token}`);
    return this.http.get<any[]>(`${this.apiUrl}/news/news-summary/`, { headers })
  }
}
