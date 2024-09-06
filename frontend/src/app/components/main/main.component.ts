import { Component, OnInit } from '@angular/core';
import { LoaderComponent } from '../../components/loader/loader.component';
import { CommonModule } from '@angular/common';
import { MarkdownComponent } from 'ngx-markdown';
import { NewsServiceService } from '../../service/news-api/news-service.service';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [LoaderComponent, CommonModule, MarkdownComponent],
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent implements OnInit {
  summary: string = '';
  loading$: Observable<boolean>;

  constructor(private newsService: NewsServiceService, private toastr: ToastrService) {
    this.loading$ = this.newsService.loading$;
  }

  ngOnInit(): void {
    this.loadSummary();
  }

  loadSummary(): void {
    this.newsService.data$.subscribe(data => {
      if (data) {
        this.summary = this.preprocessText(data.summary);
      }
    });
  }

  preprocessText(text: string): string {
    return text.replace(/\n\n/g, '<br><br>');
  }
}
