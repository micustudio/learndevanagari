import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../user.service';
import { User } from '../user-module/user.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  dataRetrieved: boolean = false;
  user: User;
  path: string;
  gravatarUrl: string;
  userDetails: boolean = false;

  constructor(private userService: UserService,
              private route: ActivatedRoute) { }

  ngOnInit() {
     this.route.params.subscribe(
                params => {
                  this.path = params['id'];
                  this.user = this.userService.returnUser();
                  if(this.user){
                    console.log("WHOOOA THERE IS A USER!!!! WOOOO");
                  }
                  else {
                    console.log("There was no user setted...");
                    this.userService.getUserById(this.path).subscribe(
                            (user: User) => {
                                this.user = user;
                                console.log("Thus, we got a user!");
                                console.log(this.user);
                                this.userService.getGravatar(this.user.email).subscribe(
                                    (url: string) => {
                                      console.log("The GG URL is..." + url);
                                      this.gravatarUrl = url;
                                      this.userDetails = true;
                                  });
                  

                      });
                  }

              });
  }
}
