import { Component } from '@angular/core';
import { NewsService } from '../../service/news/news.service';
import { LoaderComponent } from '../../components/loader/loader.component';
import { CommonModule } from '@angular/common';
import { MarkdownComponent } from 'ngx-markdown';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [LoaderComponent,CommonModule,MarkdownComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {
  summary: string = `## Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum ipsa nihil, facere quae fugiat labore quis, modi doloribus blanditiis qui, eveniet placeat rerum quidem aliquid. Animi quidem explicabo iusto id harum. Nihil quam excepturi impedit magnam harum omnis maxime perspiciatis culpa itaque eaque eligendi nobis hic rerum, optio unde ex.
Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente, deleniti. Sit tempore ipsa quis omnis fugit, quibusdam consequuntur et quidem provident, beatae, labore fugiat! Nostrum vero, nihil nulla consequatur enim quidem laborum exercitationem ## dolorum aliquam hic maxime, magni sapiente quia ipsam doloremque, sequi ex earum molestiae. Quae saepe aperiam nemo, omnis aut cumque totam amet quod assumenda id tempore perspiciatis culpa impedit quam similique nisi accusamus veritatis ad nostrum ratione? Ratione commodi mollitia consequuntur rerum ad excepturi eveniet nemo fugit iste, ex sed officia et voluptate aliquam neque quae quisquam. Iure nostrum sit illo perspiciatis debitis voluptatum, assumenda laborum, quibusdam incidunt error aut quae, ab numquam minus deleniti ducimus recusandae esse id amet nihil nulla ##laudantium. Inventore provident, nihil explicabo quia error natus officia laboriosam ea aut corporis, quidem magnam maxime assumenda? Blanditiis provident quis soluta cupiditate illum modi optio at hic, possimus fugit, iure aut, quia neque. Dolor minima quis architecto non alias. Aperiam nesciunt porro est, neque error ratione perferendis, assumenda optio culpa veniam fugiat quo ab illum, earum corrupti illo quibusdam beatae ipsam amet totam nostrum! Sed, autem, alias deserunt voluptates enim qui omnis nostrum reiciendis delectus odio impedit, debitis laboriosam aliquam veniam. Iure odio quidem incidunt?
## lor minima quis architecto non alias. Aperiam nesciunt porro est, neque error ratione perferendis, assumenda optio culpa veniam fugiat quo ab illum, earum corrupti illo quibusdam beatae ipsam amet totam nostrum! Sed, autem, alias deserunt voluptates enim qui omnis nostrum reiciendis delectus odio impedit, debitis laboriosam aliquam veniam. Iure odio quidem incidunt?
';`
  loading: boolean = false;
  constructor(private newsService: NewsService) {}

  ngOnInit(): void {
    const token = localStorage.getItem('token') || '';
    
    // First, getting news articles
    this.newsService.getNewsArticles(token).subscribe(
      articles => {
        console.log('Articles fetched successfully:', articles);

        // getting news summary
        this.newsService.getNewsSummary(token).subscribe(
          data => {
            this.summary = JSON.parse(data.summary);
            this.loading = false;
            console.log('Summary:', this.summary);
          },
          error => {
            console.error('Error fetching news summary:', error);
          }
        );
      },
      error => {
        console.error('Error fetching news articles:', error);
      }
    );
  }
}
