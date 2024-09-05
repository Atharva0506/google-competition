import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from '../../service/auth/auth.service';


@Component({
  selector: 'app-setting',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './setting.component.html',
  styleUrl: './setting.component.css'
})
export class SettingComponent {
  constructor(private authService:AuthService){}

  onLogOut(){
    this.authService.signOut()
  }
}
