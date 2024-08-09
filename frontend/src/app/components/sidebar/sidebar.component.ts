import { Component, OnInit } from '@angular/core';
import { NewsService } from '../../service/news/news.service';
import { CommonModule, DatePipe } from '@angular/common';



@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [DatePipe,CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent implements OnInit {
  items: any[] = []; // Define the type based on your actual data structure

  constructor(private newsService: NewsService) { }

  ngOnInit(): void {
    const token = localStorage.getItem("token") || ''
    this.newsService.getNewsArticles(token).subscribe(data => {
      this.items = data;
    });
  }
 
}
