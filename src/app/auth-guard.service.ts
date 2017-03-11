import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AdminService } from './admin-module/admin.service';
import { UserService } from './user.service';


@Injectable()

export class AuthGuard implements CanActivate {

constructor(private router: Router,
            private adminService: AdminService,
            private userService: UserService) {

}

canActivate() {
    if (this.userService.isLoggedIn()) {
        return true;
    }
    else {
        this.router.navigate(['/login']);
    }
    return false;
}

}