import { Routes, RouterModule, CanActivate } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { AboutComponent } from "./about/about.component";
import { ContactComponent } from "./contact/contact.component";
import { AdminComponent } from './admin-module/admin/admin.component';
import { SignupComponent } from './user-module/signup/signup.component';
import { SigninComponent } from './user-module/signin/signin.component';
import { StudyComponent } from './study/study.component';

import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileComponent } from './profile/profile.component';



import { AuthGuard } from './auth-guard.service';

const APP_ROUTES: Routes = [
    //{ path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: '', component: HomeComponent},
    { path: 'about', component: AboutComponent },
    { path: 'contact', component: ContactComponent },
    { path: 'admin', component: AdminComponent, loadChildren: './admin-module/admin.module#AdminModule' },
    { path: 'signup', component: SignupComponent},
    { path: 'login', component: SigninComponent},
    { path: 'profile', component: ProfileComponent},
    { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]},
    { path: 'study', component: StudyComponent, canActivate: [AuthGuard]},
    { path: '**', component: StudyComponent, canActivate: [AuthGuard]}
];

export const Routing = RouterModule.forRoot(APP_ROUTES);