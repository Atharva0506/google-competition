import { Routes } from '@angular/router';
import { SettingComponent } from './pages/setting/setting.component';
import { HomeComponent } from './pages/home/home.component';
import { UserPreferenceComponent } from './pages/user-preference/user-preference.component';
import { AccountComponent } from './pages/account/account.component';


export const routes: Routes = [
    {path:'',component:HomeComponent},
    {path:'setting',component:SettingComponent},
    {path:'user-preference',component:UserPreferenceComponent},
    {path:'account',component:AccountComponent}
];
