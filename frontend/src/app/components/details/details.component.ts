import { Component } from '@angular/core';
import { ApiService } from '../../service/api/api.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { switchMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent {
  personalDetails: string = '';
  summaryStyle: string = '';

  constructor(private apiService: ApiService, private router: Router, private toastr: ToastrService) {}

  onSubmit() {
    this.apiService.setSummaryStyle(this.summaryStyle).pipe(
      switchMap(response => {
        this.toastr.success(response.message || 'Summary style updated successfully.');
       
        return this.apiService.setInterests(this.personalDetails);
      }),
      catchError(error => {
        this.toastr.error('An error occurred while updating details');
        console.error(error);
        return of(null); 
      })
    ).subscribe(response => {
      if (response) {
        this.toastr.success(response.message || 'Personal details updated successfully.');
        this.router.navigate(['/']);
      }
    });
  }
}
