import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  private apiUrl = 'http://localhost:3000/api';
  private links: string[] = [];
  private data: any[] = [];

  constructor(private http: HttpClient) { }

  // Get News Articles
  getNewsArticles(token: string): Observable<any[]> {
    const headers = new HttpHeaders().set('Authorization', `${token}`);

    return this.http.get<any[]>(`${this.apiUrl}/news/news-articles`, { headers }).pipe(
      tap(data => {
        // Store the data and extract links
        this.data = data;
        this.links = data.map(article => article.url).filter(url => url !== undefined);
      })
    );
  }

  // Get Summary
  getNewsSummary(): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      links: this.links,
      'Authorization': token ? `${token}` : ''
    });

    return this.http.get<any>(`${this.apiUrl}/news/news-summary/`, { headers });
  }
}
