import { Component, OnInit } from '@angular/core';
import { UserService } from '../user-module/user.service';
import { User } from '../user-module/user.model';

import { Router } from '@angular/router';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  user: User;
  gravatarUrl: string;
  level: number;
  userId: string;
  userDetails: boolean = false;

  constructor(private userService: UserService,
              private router: Router) { }

  ngOnInit() {
    this.userService.signedUser.subscribe(
             (user: User) => { 
              this.user = user;
              this.userId = user.userId;
               console.log(this.user);
               this.userService.getGravatar(this.user.email).subscribe(
                 (url: string) => {
                   this.gravatarUrl = url;
                   this.level = Math.floor(Math.sqrt(user.exp));
                   console.log("THE LEVEL IS... " + this.level);
                   this.userDetails = true;
               });
               

          });
  }
  
  isLoggedIn() {
     return this.userService.isLoggedIn();
  }

  onLogout(){
    this.userService.logout();
    this.router.navigateByUrl('login');
  }

}
