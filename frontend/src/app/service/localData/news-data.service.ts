import { Injectable } from '@angular/core';

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

export class NewsDataService {
  private key = "newsArticles"
  private summary  = "summary"

  constructor() { }
  //  ================ News Articles  ================ //
  setNewsArticles(data: string): void {
    localStorage.setItem(this.key, data);
  }

  getNewsArticles(): Article[] | null {
    const data = localStorage.getItem(this.key);
    return data ? JSON.parse(data) as Article[] : null;
  }
  
  clearNewsArticles(): void {
    localStorage.removeItem(this.key);
  }
//  =================== News summary  ================ //

setNewsSummary(data: string): void {
  localStorage.setItem(this.summary, data);
}

getNewsSummary(): string[] | null {
  const data = localStorage.getItem(this.summary);
  return data ? JSON.parse(data) : null;
}

clearNewsSummary(): void {
  localStorage.removeItem(this.summary);
}
}
