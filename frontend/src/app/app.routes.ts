import { Routes } from '@angular/router';
import { SettingComponent } from './setting/setting.component';
import { HomeComponent } from './home/home.component';


export const routes: Routes = [
    {path:'',component:HomeComponent},
    {path:'setting',component:SettingComponent}
];
