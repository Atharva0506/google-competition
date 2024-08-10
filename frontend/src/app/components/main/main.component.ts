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
    this.newsService.getNewsSummary().subscribe(data => {
      this.summary = data;
      console.log('Summary:', JSON.stringify(this.summary, null, 2));
    }, error => {
      console.error('Error fetching news summary:', error);
    });
  }
  
}
