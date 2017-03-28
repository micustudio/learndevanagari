import { Component, Input, OnInit } from '@angular/core';
import { User } from '../user-module/user.model';
import { UserService } from '../user.service';

@Component({
  selector: 'app-leaderboardinstance',
  templateUrl: './leaderboardinstance.component.html',
  styleUrls: ['./leaderboardinstance.component.css']
})
export class LeaderboardinstanceComponent implements OnInit {
@Input('inputUser') user: User;
gravatarUrl: string;
level: number;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.getGravatar(this.user.email).subscribe(
                 (url: string) => {
                   console.log("The GG URL is..." + url);
                   this.gravatarUrl = url;
                   this.level = Math.floor(Math.sqrt(this.user.level));
      });
  }

}
