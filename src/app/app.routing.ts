import { Routes, RouterModule, CanActivate } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { AboutComponent } from "./about/about.component";
import { ContactComponent } from "./contact/contact.component";
import { AdminComponent } from './admin-module/admin/admin.component';
import { SignupComponent } from './user-module/signup/signup.component';
import { SigninComponent } from './user-module/signin/signin.component';
import { StudyComponent } from './study/study.component';

import { ProfileComponent } from './profile/profile.component';
import { ProfileEditComponent} from './profile-edit/profile-edit.component';
import { LearnComponent } from './learn/learn.component';

import { StatsComponent } from './stats/stats.component';
import { LeaderboardComponent } from './leaderboard/leaderboard.component';


import { AuthGuard } from './auth-guard.service';

const APP_ROUTES: Routes = [
    //{ path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: '', component: HomeComponent},
    { path: 'about', component: AboutComponent },
    { path: 'contact', component: ContactComponent },
    { path: 'admin', component: AdminComponent, loadChildren: './admin-module/admin.module#AdminModule' },
    { path: 'signup', component: SignupComponent},
    { path: 'login', component: SigninComponent},
    { path: 'profile/edit', component: ProfileEditComponent},
    { path: 'profile/:id', component: ProfileComponent},
    { path: 'leaderboard', component: LeaderboardComponent},
    { path: 'study', component: StudyComponent, canActivate: [AuthGuard]},
    { path: 'learn', component: LearnComponent, canActivate: [AuthGuard]},
    { path: 'stats', component: StatsComponent, canActivate: [AuthGuard]},
    { path: '**', component: StudyComponent, canActivate: [AuthGuard]}
];

export const Routing = RouterModule.forRoot(APP_ROUTES);