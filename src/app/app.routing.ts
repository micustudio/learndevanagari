import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { PortfolioComponent } from "./portfolio/portfolio.component";
import { AboutComponent } from "./about/about.component";
import { ContactComponent } from "./contact/contact.component";

import { AdminComponent } from './admin-module/admin/admin.component';
import { SignupComponent } from './admin-module/signup/signup.component';
import { SigninComponent } from './admin-module/signin/signin.component';
import { ItemAddComponent } from './admin-module/item-add/item-add.component';


const APP_ROUTES: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'portfolio', component: PortfolioComponent },
    { path: 'about', component: AboutComponent },
    { path: 'contact', component: ContactComponent },
    { path: 'admin', component: AdminComponent, loadChildren: './admin-module/admin.module#AdminModule' },
];

export const Routing = RouterModule.forRoot(APP_ROUTES);