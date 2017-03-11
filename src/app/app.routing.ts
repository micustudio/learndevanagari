import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { AboutComponent } from "./about/about.component";
import { ContactComponent } from "./contact/contact.component";

import { AdminComponent } from './admin-module/admin/admin.component';
import { SignupComponent } from './user-module/signup/signup.component';
import { SigninComponent } from './user-module/signin/signin.component';


const APP_ROUTES: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'about', component: AboutComponent },
    { path: 'contact', component: ContactComponent },
    { path: 'admin', component: AdminComponent, loadChildren: './admin-module/admin.module#AdminModule' },
    { path: 'signup', component: SignupComponent},
    { path: 'signin', component: SigninComponent}
];

export const Routing = RouterModule.forRoot(APP_ROUTES);