import { Routes } from '@angular/router';
import { SettingComponent } from './pages/setting/setting.component';
import { HomeComponent } from './pages/home/home.component';
import { UserPreferenceComponent } from './pages/user-preference/user-preference.component';
import { AccountComponent } from './pages/account/account.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { SignupComponent } from './pages/signup/signup.component';
import { LoginComponent } from './pages/login/login.component';
import { DetailsComponent } from './pages/details/details.component';
import { AuthGuard } from './auth.guard';


export const routes: Routes = [
    {path:'',component:HomeComponent,canActivate:[AuthGuard]},
    {path:'signup',component:SignupComponent},
    {path:'login',component:LoginComponent},
    {path:'details',component:DetailsComponent,canActivate:[AuthGuard]},
    {path:'setting',component:SettingComponent,
        children: [
            { path: 'user-preference', component: UserPreferenceComponent },
            { path: 'account', component: AccountComponent },
            { path: '', redirectTo: 'user-preference', pathMatch: 'full' } 
          ]
          ,canActivate:[AuthGuard]
    },
    {path:'**',component:NotFoundComponent}
];
