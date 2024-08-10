import { Component } from '@angular/core';
import { NewsService } from '../../service/news/news.service';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {
  summary: string = '';

  constructor(private newsService: NewsService) { }
  ngOnInit(): void {
    const token  = localStorage.getItem('token') || ''
    this.newsService.getNewsSummary(token).subscribe(
      data => {
        this.summary = JSON.parse(data.summary);
        console.log('Summary:', this.summary);
      },
      error => {
        console.error('Error fetching news summary:', error);
      }
    );
  }
  
}
