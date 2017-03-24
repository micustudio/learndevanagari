import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../user-module/user.model';

import { Router } from '@angular/router';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  user: User;
  userDetails: boolean = false;
  gravatarUrl: string;
  level: number;

  constructor(private router: Router,
              private userService: UserService) { }

  ngOnInit() {
    this.userService.signedUser.subscribe(
             (user: User) => { 
               this.user = user;
               console.log(this.user);
               this.userService.getGravatar(this.user.email).subscribe(
                 (url: string) => {
                   console.log("The GG URL is..." + url);
                   this.gravatarUrl = url;
                   this.level = Math.floor(Math.sqrt(user.level));
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
