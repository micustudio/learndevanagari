import { Routes, RouterModule } from "@angular/router";

import { AdminComponent } from './admin/admin.component';
import { SigninComponent } from "./signin/signin.component";
import { SignupComponent } from './signup/signup.component';
import { ItemAddComponent } from './item-add/item-add.component';
import { LogoutComponent } from './logout/logout.component';

const ADMIN_ROUTES: Routes = [
    { path: '', redirectTo: 'signin', pathMatch: 'full' },
    { path: 'signup', component: SignupComponent },
    { path: 'signin', component: SigninComponent },
    { path: 'additem', component: ItemAddComponent },
    { path: 'logout', component: LogoutComponent }
]

export const adminRouting = RouterModule.forChild(ADMIN_ROUTES);