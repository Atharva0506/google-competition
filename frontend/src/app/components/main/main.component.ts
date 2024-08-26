import { Component } from '@angular/core';
import { NewsService } from '../../service/news/news.service';
import { LoaderComponent } from '../../components/loader/loader.component';
import { CommonModule } from '@angular/common';
import { MarkdownComponent } from 'ngx-markdown';
import { TokenService } from '../../service/token/token.service';
import { DataService } from '../../service/DataUpdate/data-update.service';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [LoaderComponent, CommonModule, MarkdownComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {
  summary: string = '';
  loading: boolean = true;
  constructor(private newsService: NewsService, private token: TokenService, private dataService: DataService) { }

  ngOnInit(): void {

    this.loadSummary()
    this.dataService.dataUpdated$.subscribe(() => {
      this.loadSummary();
    });

  }

  loadSummary(): void {
    const token = this.token.getToken() || '';

    this.newsService.getNewsSummary(token).subscribe(
      data => {
        const processedSummary = this.preprocessText(data.summary);
        this.summary = processedSummary;
        this.loading = false;
      },
      error => {
        console.error('Error fetching news summary:', error);
      }
    );
  }
  preprocessText(text: string): string {
    return text.replace(/\n\n/g, '<br><br>');
  }

}

