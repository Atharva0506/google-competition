import { Routes } from '@angular/router';
import { SettingComponent } from './pages/setting/setting.component';
import { HomeComponent } from './pages/home/home.component';
import { UserPreferenceComponent } from './pages/user-preference/user-preference.component';
import { AccountComponent } from './pages/account/account.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';


export const routes: Routes = [
    {path:'',component:HomeComponent},
    {path:'setting',component:SettingComponent,
        children: [
            { path: 'user-preference', component: UserPreferenceComponent },
            { path: 'account', component: AccountComponent },
            { path: '', redirectTo: 'user-preference', pathMatch: 'full' } 
          ]
    },
    {path:'**',component:NotFoundComponent}
];
