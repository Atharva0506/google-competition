import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.prod';

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
  constructor(private http: HttpClient) {
  
  }


  // Get News Articles
  getNewsArticles(token: string): Observable<any[]> {
    const headers = new HttpHeaders().set('Authorization', `${token}`);
    return this.http.get<any[]>(`${environment.apiUrlNews}/news-articles`, { headers })
  }

  // Get Summary
  getNewsSummary(token: string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `${token}`);
    return this.http.get<any[]>(`${environment.apiUrlNews}/news-summary/`, { headers })
  }
}
