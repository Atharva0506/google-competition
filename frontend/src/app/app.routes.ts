import { Routes } from '@angular/router';
import { SettingComponent } from './components/setting/setting.component';
import { HomeComponent } from './components/home/home.component';
import { UserPreferenceComponent } from './components/user-preference/user-preference.component';
import { AccountComponent } from './components/account/account.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';
import { DetailsComponent } from './components/details/details.component';
import { AuthGuard } from './auth.guard';
import { SidebarComponent } from './components/sidebar/sidebar.component';

export const routes: Routes = [
    { path: '', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'signup', component: SignupComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent, canActivate: [AuthGuard] },
    { path: 'details', component: DetailsComponent, canActivate: [AuthGuard] },
    {path:'news-feed',component:SidebarComponent,canActivate:[AuthGuard]},
    {
        path: 'setting',
        component: SettingComponent,
        canActivate: [AuthGuard], // Protect the parent route
        children: [
            { path: 'user-preference', component: UserPreferenceComponent },
            { path: 'account', component: AccountComponent },
            { path: '', redirectTo: 'user-preference', pathMatch: 'full' }
        ]
    },
    { path: '**', component: NotFoundComponent }
];
