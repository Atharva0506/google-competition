import { Component, OnInit } from '@angular/core';
import { NewsService } from '../../service/news/news.service';
import { CommonModule, DatePipe } from '@angular/common';
import { LoaderComponent } from '../loader/loader.component';
import { FooterBtnComponent } from '../footer-btn/footer-btn.component';
import { TokenService } from '../../service/token/token.service';
import { DataService } from '../../service/DataUpdate/data-update.service';




@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [DatePipe,CommonModule,LoaderComponent, FooterBtnComponent],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent implements OnInit {
  items: any[] = [];
  loading: boolean = true;
  token:string = ''
  constructor(private newsService: NewsService,private tokenService: TokenService,private dataService: DataService) { }
 
  ngOnInit(): void {
    if (!this.dataService.isDataFetched()) {
      this.loadNewsArticles();
    } else {
      this.loading = false;
    }

    this.dataService.dataUpdated$.subscribe(() => {
      this.loading = true;
      this.loadNewsArticles();
    });
  }

  loadNewsArticles(): void {
   
    const token = this.tokenService.getToken() || ''; 
    this.newsService.getNewsArticles(token).subscribe(data => {
      this.loading = false;
      this.items = data;
      this.dataService.emitApiCallCompleted();
    });
  }

}
