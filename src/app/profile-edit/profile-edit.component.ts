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

  constructor(private userService: UserService,
              private route: Router) { }

  onPublish(form: NgForm){
        this.user.fullName          = form.value.fullName;
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
    console.log("The user is from PROFILE EDIT");
    console.log(this.user);
    this.username = this.user.username;
  }


}
