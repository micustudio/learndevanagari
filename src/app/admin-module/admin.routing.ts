import { Routes, RouterModule } from "@angular/router";


import { AdminComponent } from './admin/admin.component';
import { SignupComponent } from './signup/signup.component';
import { SigninComponent } from './signin/signin.component';
import { ItemAddComponent } from './item-add/item-add.component';

const AUTH_ROUTES: Routes = [
    { path: '', redirectTo: 'signup', pathMatch: 'full' },
    { path: 'signup', component: SignupComponent },
    { path: 'signin', component: SigninComponent },
    //{ path: 'logout', component: LogoutComponent },
    { path: 'additem', component: ItemAddComponent }
]

export const AdminRouting = RouterModule.forChild(AUTH_ROUTES);