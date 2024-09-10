import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { switchMap, catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment.prod';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient, private authService: AuthService) { }

  // ====================================== POST =================================== //
  setSummaryStyle(summaryStyle: string): Observable<any> {
    return this.authService.getAuthHeaders().pipe(
      switchMap(headers => 
        this.http.post(`${environment.apiUrlUser}/summary-style`, { summaryStyle }, { headers })
      ),
      catchError(error => {
        console.error('Error setting summary style:', error);
        return of(null);  
      })
    );
  }

  setInterests(interests: string): Observable<any> {
    return this.authService.getAuthHeaders().pipe(
      switchMap(headers => 
        this.http.post(`${environment.apiUrlUser}/interests`, { interests }, { headers })
      ),
      catchError(error => {
        console.error('Error setting interests:', error);
        return of(null);  
      })
    );
  }

  // ==================================== GET ==================================== //
  getInterests(): Observable<any> {
    return this.authService.getAuthHeaders().pipe(
      switchMap(headers => 
        this.http.get(`${environment.apiUrlUser}/interests`, { headers })
      ),
      catchError(error => {
        console.error('Error fetching interests:', error);
        return of([]); 
      })
    );
  }

  getSummaryStyle(): Observable<any> {
    return this.authService.getAuthHeaders().pipe(
      switchMap(headers => 
        this.http.get(`${environment.apiUrlUser}/summary-style`, { headers })
      ),
      catchError(error => {
        console.error('Error fetching summary style:', error);
        return of(null); 
      })
    );
  }
}
