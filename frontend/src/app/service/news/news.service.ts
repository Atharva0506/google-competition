import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  private apiUrl = 'http://localhost:3000/api/news/news-articles'; 

  constructor(private http: HttpClient) { }

  getNewsArticles(token: string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `${token}`);
    return this.http.get<any>(`${this.apiUrl}`,{ headers});
  }
}
