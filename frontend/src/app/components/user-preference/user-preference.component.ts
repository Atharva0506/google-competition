import { Component } from '@angular/core';
import { SettingComponent } from '../setting/setting.component';

@Component({
  selector: 'app-user-preference',
  standalone: true,
  imports: [SettingComponent],
  templateUrl: './user-preference.component.html',
  styleUrl: './user-preference.component.css'
})
export class UserPreferenceComponent {

}
