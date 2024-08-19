import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NewsDataService {
  private key = "newsArticles"
  private refreshTrigger = new BehaviorSubject<void>(undefined);
  refresh$ = this.refreshTrigger.asObservable();
  constructor() { }
  setNewsArticles(data: string): void {
    localStorage.setItem(this.key, data);
  }

  getNewsArticles(): string[] | null {
    const data = localStorage.getItem(this.key);
    return data ? JSON.parse(data) : null;
  }
  
  clearNewsArticles(): void {
    localStorage.removeItem(this.key);
  }
     //  Refresh The Components after refresh button click 
     triggerRefresh() {
      this.refreshTrigger.next();
    }
}
