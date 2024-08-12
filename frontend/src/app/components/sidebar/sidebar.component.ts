import { Component, OnInit } from '@angular/core';
import { NewsService } from '../../service/news/news.service';
import { CommonModule, DatePipe } from '@angular/common';
import { LoaderComponent } from '../loader/loader.component';



@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [DatePipe,CommonModule,LoaderComponent],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent implements OnInit {
  items: any[] = [];
  loading: boolean = true;

  constructor(private newsService: NewsService) { }

  ngOnInit(): void {
    const token = localStorage.getItem("token") || ''
    this.newsService.getNewsArticles(token).subscribe(data => {
      this.loading = false;
      this.items = data;

    });
  }
 
}
