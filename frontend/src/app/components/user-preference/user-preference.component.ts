import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../service/api/api.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-preference',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './user-preference.component.html',
  styleUrl: './user-preference.component.css'
})
export class UserPreferenceComponent {
  interests: string = '';
  summaryStyle: string = '';
  token: string = localStorage.getItem('token')||''; 

  constructor(private apiService: ApiService,private toastr :ToastrService) {}

  ngOnInit() {
    this.loadDetails();
  }

  loadDetails() {
    this.apiService.getinterests(this.token).subscribe({
      next: data => {
        this.interests = data.interests || ''; 
      },
      error: err => this.toastr.error('Error fetching personal details:'),
    });

    this.apiService.getSummaryStyle(this.token).subscribe({
      next: data => {
        this.summaryStyle = data || ''; 
      },
      error: err => this.toastr.error('Error fetching summary style:'),
    });
  }

  updatePersonalDetails() {
    this.apiService.setInterests(this.token, this.interests).subscribe({
      next: response => this.toastr.show('Personal details updated:'),
      error: err => this.toastr.error('Error updating personal details:'),
    });
  }

  updateSummaryStyle() {
    this.apiService.setSummaryStyle(this.token, this.summaryStyle).subscribe({
      next: response => this.toastr.show('Summary style updated:'),
      error: err => this.toastr.error('Error updating summary style:'),
    });
  }
}
