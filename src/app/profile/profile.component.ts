import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../user-module/user.service';
import { User } from '../user-module/user.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: User;
  path: string;
  gravatarUrl: string;
  userDetails: boolean;
  username: string;
  exp: number;
  level: number;
  fullName: string;
  location: string;
  biography: string;

  constructor(private userService: UserService,
              private route: ActivatedRoute) { }

  ngOnInit() {
     this.route.params.subscribe(
                params => {
                  this.path = params['id'];
                  this.userService.getUserById(this.path).subscribe(
                            (user: User) => {
                                this.user = user;
                                this.username = this.user.username;
                                this.exp = this.user.exp;
                                this.level = Math.floor(Math.sqrt(this.user.exp));
                                console.log("Thus, we got a user!");
                                console.log(this.user);
                                this.userService.getGravatar(this.user.email).subscribe(
                                    (url: string) => {
                                      console.log("The GG URL is..." + url);
                                      this.gravatarUrl = url;
                                      if(this.user.fullName)
                                        this.fullName = this.user.fullName;
                                      else
                                        this.fullName = 'Anonymous Joe';
                                      if(this.user.location)
                                        this.location = this.user.location;
                                      else
                                        this.location = 'Earth';
                                      if(this.user.biography)
                                        this.biography = this.user.biography;
                                      else
                                      {
                                        this.biography = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec nibh eu massa finibus auctor eu eget nulla. Phasellus molestie erat quis erat porttitor, consequat fermentum ligula ultrices. Ut varius gravida felis, id varius tellus lobortis ut. Fusce id arcu tempor, blandit justo vel, tempor ante. Quisque scelerisque nisl in dolor tempor, at consequat nibh aliquet. Etiam augue diam, tempus ac nulla id, fermentum lacinia enim. Proin eget consequat eros. Sed viverra felis non erat tempus suscipit. Ut at vulputate orci. Nunc placerat justo odio, et luctus augue fermentum id. Nulla ultricies viverra erat, eu posuere nunc blandit in. Cras lacinia varius mi, quis efficitur sapien. Donec ac congue leo. Nulla sapien leo, porta vitae magna vitae, aliquam pellentesque ante. Etiam rhoncus tempor erat.'
                                      }
                                  });
                  

                      });
    });
  }

  isLoggedIn() {
     return this.userService.isLoggedIn();
  }
  
  belongToUser(){
    return localStorage.getItem('userId') == this.path;
  }
  
}
