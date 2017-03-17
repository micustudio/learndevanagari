import { Component, OnInit, AfterContentInit} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../user.service';
import { User } from '../user.model';

import { trigger, state, style, transition, animate, keyframes } from '@angular/core';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
  animations: [
    trigger('successfulSignIn', [
      state('true' , style({ opacity: 1 })),
      state('false', style({ opacity: 0 })),
      transition('0 => 1', animate('0.1s 100ms')),
      transition('1 => 0', animate('0.1s 100ms'))
    ])
  ]
})
export class SigninComponent implements OnInit, AfterContentInit {
  myForm: FormGroup;
  signedUp: boolean = false;

  constructor(private userService: UserService,
              private router: Router) { }

        onSignin(){
        const user = new User(null, this.myForm.value.email, this.myForm.value.password);
        this.userService.signin(user)
            .subscribe(
                data => {
                    console.log("The data form the signin component is coming back as...");
                    console.log(data.token);
                    console.log(data.userId);
                    localStorage.setItem('token', data.token);
                    localStorage.setItem('userId', data.userId);
                    /*console.log("The user ID is");
                    console.log(data.user._id);
                    let user = new User(
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
                    console.log(user);
                    this.userService.emitUser(user);*/
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

    signup() {
      this.router.navigateByUrl('/signup');
  }

    ngAfterContentInit(){
      if(this.userService.signedUpSuccessful()){
          this.signedUp = this.userService.signedUpSuccessful();
          console.log("WHOA THIS IS A SUCCESSFUL SIGN UP!!!");
          console.log("LETS DISPLAY A MESSAGE!!");
      }
  }

}
