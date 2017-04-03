import { Component, Input, OnInit } from '@angular/core';
import { User } from '../user-module/user.model';
import { UserService } from '../user-module/user.service';

@Component({
  selector: 'app-leaderboardinstance',
  templateUrl: './leaderboardinstance.component.html',
  styleUrls: ['./leaderboardinstance.component.css']
})
export class LeaderboardinstanceComponent implements OnInit {
@Input() index: number;
@Input('inputUser') user: User;
gravatarUrl: string;
userId: string;
level: number;
firstPlace: boolean;
secondPlace: boolean;
thirdPlace: boolean;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.getGravatar(this.user.email).subscribe(
                 (url: string) => {
                   this.index++;
                   console.log("The GG URL is..." + url);
                   this.gravatarUrl = url;
                   this.level = Math.floor(Math.sqrt(this.user.exp));
                   console.log("The USER is...");
                   console.log(this.user);
                   
                   console.log("The user id is...");
                   console.log(this.user.userId);                   
                   this.userId = this.user.userId;
                   console.log(this.index);
                   this.checkRank();
      });
  }

  checkRank(){
    if(this.index == 1)
      this.firstPlace = true;
    else if(this.index == 2)
      this.secondPlace = true;
    else if(this.index == 3)
      this.thirdPlace = true;
  }

}
