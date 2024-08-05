import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UserPreferenceComponent } from '../user-preference/user-preference.component';


@Component({
  selector: 'app-setting',
  standalone: true,
  imports: [RouterOutlet, UserPreferenceComponent],
  templateUrl: './setting.component.html',
  styleUrl: './setting.component.css'
})
export class SettingComponent {

}
