import { Component, AfterViewInit } from '@angular/core';
import { User } from '../user-module/user.model';
import { UserService } from '../user.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.css']
})
export class ProfileEditComponent implements AfterViewInit {
user: User;
username: string;
gravatarUrl: string;

  constructor(private userService: UserService,
              private route: Router) { }

  onPublish(form: NgForm){
        this.user.fullName          = form.value.fullName;
        this.user.location          = form.value.location;
        this.user.biography         = form.value.biography;
        this.userService.updateItem(this.user)
                .subscribe(
                    result => {
                    console.log(result)
                    this.route.navigateByUrl('/profile/' + this.user.userId);
                  }
                );
    }

  ngAfterViewInit() {
    this.user = this.userService.returnUser();
    this.gravatarUrl = this.userService.returnGravatar();
    this.username = this.user.username;
    console.log("The user is from PROFILE EDIT");
    console.log(this.user);
  }


}
