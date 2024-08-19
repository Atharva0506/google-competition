import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer-btn',
  standalone: true,
  imports: [RouterLink,CommonModule],
  templateUrl: './footer-btn.component.html',
  styleUrl: './footer-btn.component.css'
})
export class FooterBtnComponent {
  constructor(private router: Router) {}

  isActive(route: string): boolean {
    return this.router.url === route;
  }
}
