import { Component } from '@angular/core';
import { ApiService } from '../../service/api/api.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-details',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})
export class DetailsComponent {
  personalDetails: string = '';
  summaryStyle: string = '';

  constructor(private apiService: ApiService,private router:Router,private toastr:ToastrService) {}

  onSubmit() {
    const token = localStorage.getItem('token') || ''; 

    this.apiService.setSummaryStyle(token, this.summaryStyle).subscribe(response => {
      this.toastr.show(response.message)
    });

    this.apiService.setInterests(token, this.personalDetails).subscribe(response => {
      this.toastr.show(response.message)
    });
    this.router.navigate(['/'])
  }
}
