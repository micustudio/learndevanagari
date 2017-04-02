import { Component, AfterViewInit } from '@angular/core';
import { UserService } from '../user-module/user.service';
import { User } from '../user-module/user.model';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.css']
})
export class LeaderboardComponent implements AfterViewInit {
users: User[];

  constructor( private userService: UserService ) { }

  ngAfterViewInit() {
    console.log("HELLO FROM NG VIEW INIT!!!");
    this.users = [];
    this.userService.getUsers().subscribe(
                users => { 
                  this.users = users;
                  console.log(users);
                });
  }

}
