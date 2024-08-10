import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiUrl = 'http://localhost:3000/api/users'; 
  private apiUrlNews = 'http://localhost:3000/api/news'

  constructor(private http: HttpClient) { }
// ====================================== POST =================================== //
  setSummaryStyle(token: string, summaryStyle: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/summary-style`, { summaryStyle }, {
      headers: { Authorization: `${token}` }
    });
  }

  setInterests(token: string, interests: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/interests`, { interests }, {
      headers: { Authorization: `${token}` }
    });
  }

  // ==================================== GET ==================================== //
  getinterests(token: string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `${token}`);
    return this.http.get(`${this.apiUrl}/interests`, { headers });
  }

  getSummaryStyle(token: string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `${token}`);
    return this.http.get(`${this.apiUrl}/summary-style`, { headers });
  }
  
}
