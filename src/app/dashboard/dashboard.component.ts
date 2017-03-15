import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { UserService } from '../user.service';
import { User } from '../user-module/user.model';
import { trigger, state, style, transition, animate, keyframes } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  user: User;

  constructor(private userService: UserService,
              private route: Router) { }

  navigateStudy(){
    this.route.navigateByUrl('/study');
  }

  ngOnInit() {
        /*this.userService.signedUser.subscribe(
            (user: User) => { 
              this.user = user;
              console.log("The user is");
              console.log(this.user); 
        });*/
  }

}
