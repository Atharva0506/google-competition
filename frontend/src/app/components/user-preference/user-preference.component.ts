import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../service/api/api.service';
import { ToastrService } from 'ngx-toastr';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-user-preference',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './user-preference.component.html',
  styleUrls: ['./user-preference.component.css']
})
export class UserPreferenceComponent {
  interests: string = '';
  summaryStyle: string = '';

  constructor(private apiService: ApiService, private toastr: ToastrService) {}

  ngOnInit() {
    this.loadDetails();
  }

  loadDetails() {
    this.apiService.getInterests().pipe(
      catchError(err => {
        this.toastr.error('Error fetching personal details:');
        return of({ interests: '' });  
      })
    ).subscribe(data => {
      this.interests = data.interests || '';
    });

    this.apiService.getSummaryStyle().pipe(
      catchError(err => {
        this.toastr.error('Error fetching summary style:');
        return of('');  
      })
    ).subscribe(data => {
      this.summaryStyle = data || '';
    });
  }

  updatePersonalDetails() {
    this.apiService.setInterests(this.interests).pipe(
      catchError(err => {
        this.toastr.error('Error updating personal details:');
        return of(null); 
      })
    ).subscribe(response => {
      this.toastr.success('Personal details updated successfully.');
    });
  }

  updateSummaryStyle() {
    this.apiService.setSummaryStyle(this.summaryStyle).pipe(
      catchError(err => {
        this.toastr.error('Error updating summary style:');
        return of(null);  
      })
    ).subscribe(response => {
      this.toastr.success('Summary style updated successfully.');
    });
  }
}
