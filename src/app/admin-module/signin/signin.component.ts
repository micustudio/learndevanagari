import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { AdminService } from "../admin.service";
import { Admin } from "../admin.model"

import { Router } from "@angular/router";

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  myForm: FormGroup;

  constructor(private authService: AdminService,
              private router: Router) { }

      onSignin(){
        const admin = new Admin(null, this.myForm.value.email, this.myForm.value.password);
        this.authService.signin(admin)
            .subscribe(
                data => {
                    localStorage.setItem('token', data.token);
                    localStorage.setItem('adminId', data.adminId);
                    this.router.navigateByUrl('/admin/additem');
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
