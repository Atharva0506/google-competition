import { Routes } from '@angular/router';
import { SettingComponent } from './components/setting/setting.component';
import { HomeComponent } from './components/home/home.component';
import { UserPreferenceComponent } from './components/user-preference/user-preference.component';
import { AccountComponent } from './components/account/account.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';
import { DetailsComponent } from './components/details/details.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { authGuard } from './auth.guard';

export const routes: Routes = [
    { path: '', component: HomeComponent, canMatch: [authGuard] },
    { path: 'signup', component: SignupComponent, canMatch: [authGuard] },
    { path: 'login', component: LoginComponent, canMatch: [authGuard] },
    { path: 'details', component: DetailsComponent, canMatch: [authGuard] },
    { path: 'news-feed', component: SidebarComponent, canMatch: [authGuard] },
    {
        path: 'setting',
        component: SettingComponent,
        canMatch: [authGuard], 
        children: [
            { path: 'user-preference', component: UserPreferenceComponent },
            { path: 'account', component: AccountComponent },
            { path: '', redirectTo: 'user-preference', pathMatch: 'full' }
        ]
    },
    { path: '**', component: NotFoundComponent }
];
