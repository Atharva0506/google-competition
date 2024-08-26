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
  private count:number = 0;
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
    // let x = Math.floor((Math.random() * 100)+1)
    // return new Observable(observer => this.http.get(`https://jsonplaceholder.typicode.com/todos/${x}`).subscribe((data)=>{
    // console.log("Count is:" + this.count )
    // this.count++;
    // console.log(data)
    // }))
  }
  

  // Get Summary
  getNewsSummary(token: string): Observable<any> {
    const storedSummary = this.newsDataService.getNewsSummary();
    console.log('Stored summary:', storedSummary);
    
    if (storedSummary) {
      return of(storedSummary);
    }

    const headers = new HttpHeaders().set('Authorization', `${token}`);
    return new Observable(observer => {
      this.http.get<any[]>(`${environment.apiUrlNews}/news-summary/`, { headers })
        .subscribe(
          summary => {
            this.newsDataService.setNewsSummary(JSON.stringify(summary));
            observer.next(summary);
            console.log('Fetched summary:', summary);
            observer.complete();
          },
          error => {
            observer.error(error);
          }
        );
    });
  }
 
}
