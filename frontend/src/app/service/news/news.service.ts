import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, Subject } from 'rxjs';
import { environment } from '../../../environments/environment';
import { NewsDataService } from '../localData/news-data.service';
import { TokenService } from '../token/token.service';


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
  private articles$: Observable<Article[]> | null = null;
  private summary$: Subject<any> = new Subject<any>();
  constructor(private http: HttpClient, private newsDataService: NewsDataService, private token: TokenService) { }


  // Get News Articles
  getNewsArticles(token: string): Observable<any[]> {
    const storedNews = this.newsDataService.getNewsArticles();
    if (storedNews) {
      return of(storedNews);
    }
    const headers = new HttpHeaders().set('Authorization', `${token}`);
    return new Observable(observer => {
      this.http.get<Article[]>(`${environment.apiUrlNews}/news-articles`, { headers })
        .subscribe({
          next: news => {
            this.newsDataService.setNewsArticles(JSON.stringify(news)); // Store the news in local storage
            observer.next(news); // Emit the news articles
            observer.complete(); // Complete the observable
          },
          complete: () => {
            const token = this.token.getToken() || ''
            this.getNewsSummary(token)
          }

        });
    });
    //     let x = Math.floor((Math.random() * 100)+1)
    //     return new Observable(observer => this.http.get(`https://jsonplaceholder.typicode.com/todos/${x}`).subscribe({
    //       next: (data)=>{
    //     console.log("This is articles going out")
    //     console.log(data);
    //   },
    //   complete:()=>{
    //     const token = this.token.getToken() || ''
    //     this.getNewsSummary(token)
    //   }
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
  //   let x = Math.floor((Math.random() * 100) + 1)
  //   return new Observable(observer => this.http.get(`https://jsonplaceholder.typicode.com/todos/${x}`).subscribe((data) => {
  //     console.log("This is summary going out")

  //     console.log(data)
  //   }))
  }

}
