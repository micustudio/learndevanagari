import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from '../../user.service';
import { User } from '../user.model';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  myForm: FormGroup;

  constructor(private userService: UserService) { }

        onSignin(){
        const user = new User(null, this.myForm.value.email, this.myForm.value.password);
        this.userService.signin(user)
            .subscribe(
                data => {
                    localStorage.setItem('token', data.token);
                    localStorage.setItem('adminId', data.adminId);
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
