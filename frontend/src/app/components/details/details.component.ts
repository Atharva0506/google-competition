import { Component } from '@angular/core';
import { ApiService } from '../../service/api/api.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { switchMap } from 'rxjs/operators';

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

  constructor(private apiService: ApiService, private router: Router, private toastr: ToastrService) {}

  onSubmit() {
    const token = localStorage.getItem('token') || ''; 
    console.log("token: " + token);

    this.apiService.setSummaryStyle(token, this.summaryStyle).pipe(
      switchMap(response => {
        this.toastr.show(response.message);
        // Only after the first API call completes, make the second call
        return this.apiService.setInterests(token, this.personalDetails);
      })
    ).subscribe(response => {
      this.toastr.show(response.message);
      this.router.navigate(['/']);
    }, error => {
      this.toastr.error('An error occurred while updating details');
      console.error(error);
    });
  }
}
