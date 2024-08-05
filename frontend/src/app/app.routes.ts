import { Routes } from '@angular/router';
import { SettingComponent } from './pages/setting/setting.component';
import { HomeComponent } from './pages/home/home.component';


export const routes: Routes = [
    {path:'',component:HomeComponent},
    {path:'setting',component:SettingComponent}
];
