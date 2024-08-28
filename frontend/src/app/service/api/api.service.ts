import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.prod';
@Injectable({
  providedIn: 'root'
})
export class ApiService {



  constructor(private http: HttpClient) { }
// ====================================== POST =================================== //
  setSummaryStyle(token: string, summaryStyle: string): Observable<any> {
    return this.http.post(`${environment.apiUrlUser}/summary-style`, { summaryStyle }, {
      headers: { Authorization: `${token}` }
    });
  }

  setInterests(token: string, interests: string): Observable<any> {
    return this.http.post(`${environment.apiUrlUser}/interests`, { interests }, {
      headers: { Authorization: `${token}` }
    });
  }

  // ==================================== GET ==================================== //
  getinterests(token: string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `${token}`);
    return this.http.get(`${environment.apiUrlUser}/interests`, { headers });
  }

  getSummaryStyle(token: string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `${token}`);
    return this.http.get(`${environment.apiUrlUser}/summary-style`, { headers });
  }
  
}
