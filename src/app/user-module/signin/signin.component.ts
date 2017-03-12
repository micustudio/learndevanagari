import { Component, OnInit} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from '../../user.service';
import { User } from '../user.model';

import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  myForm: FormGroup;

  constructor(private userService: UserService,
              private router: Router) { }

        onSignin(){
        const user = new User(null, this.myForm.value.email, this.myForm.value.password);
        this.userService.signin(user)
            .subscribe(
                data => {
                    console.log("The data form the signin component is coming back as...");
                    localStorage.setItem('token', data.token);
                    localStorage.setItem('userID', data.userID);
                    console.log("The user ID is");
                    console.log(data.userID);
                    /*let user = new User(
                                data.user.username,
                                data.user.email,
                                data.user.password,
                                data.user.fullName,
                                data.user.profilePic,
                                data.user.location,
                                data.user.biography,
                                data.user.date,
                                data.user.items);
                    console.log("The  user is...........");
                    console.log(user);*/
                    this.userService.emitUserID(data.userID);
                    this.router.navigateByUrl('/study');
                },
                error => console.error(error)
            )
        this.myForm.reset();
    }

  ngOnInit() {

     this.myForm = new FormGroup({
            email: new FormControl(null, Validators.required),
            password: new FormControl(null, Validators.required)
      })
  
  }
}
