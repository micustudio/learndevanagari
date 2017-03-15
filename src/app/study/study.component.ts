import { Component, AfterContentInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { UserService } from '../user.service';
import { User } from '../user-module/user.model';
import { trigger, state, style, transition, animate, keyframes } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';

@Component({
  selector: 'app-study',
  templateUrl: './study.component.html',
  styleUrls: ['./study.component.css']
})
export class StudyComponent implements AfterContentInit {
  myForm: FormGroup;
  user: User;
  character: string;
  saved: [{
      savedChar: string,
      correct: boolean
  }]

  constructor(private userService: UserService) { }

  ngAfterContentInit() {
        this.myForm = new FormGroup({
            check: new FormControl(null, Validators.required)
        });
        this.user = this.userService.fetchStoredUser();
        console.log("The user for study component issssss");
        console.log(this.user);
        console.log(this.user.items);
        this.character = this.user.items[0].char;
  }
  
  onCheck(){
    console.log("BAKAW!!!");
  }
}
