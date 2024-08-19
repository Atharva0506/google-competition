import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NewsDataService {
  private key = "newsArticles"
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
}
