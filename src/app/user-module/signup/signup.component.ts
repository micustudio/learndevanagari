import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { User } from '../user.model';
import { UserService } from '../../user.service';

import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  myForm: FormGroup;

  constructor(private userService: UserService,
              private router: Router) { }

    onSignup(){
        let user = new User(
            this.myForm.value.username,
            this.myForm.value.email,
            this.myForm.value.password
        );
        this.userService.signup(user)
            .subscribe(
                data => {
                    console.log(data);
                    this.router.navigateByUrl('/signin');
                },
                error => console.log(error)
            );
        this.myForm.reset();

    }


  ngOnInit() {
          this.myForm = new FormGroup({
            username: new FormControl(null, Validators.required),
            email: new FormControl(null, Validators.required),
            password: new FormControl(null, Validators.required)
        })
  }

}
