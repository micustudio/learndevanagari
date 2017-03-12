import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { UserService } from '../user.service';
import { User } from '../user-module/user.model';
import { trigger, state, style, transition, animate, keyframes } from '@angular/core';

@Component({
  selector: 'app-study',
  templateUrl: './study.component.html',
  styleUrls: ['./study.component.css']
})
export class StudyComponent implements OnInit {
  myForm: FormGroup;
  user: User;
  char: string;
  saved: [{
      savedChar: string,
      correct: boolean
  }]

  constructor(private userService: UserService) { }

  ngOnInit() {
        this.myForm = new FormGroup({
            check: new FormControl(null, Validators.required)
        });
        this.userService.signedUserID.subscribe(
            (userID: string) => { 
              /*this.user = user;
                console.log("SUCCESSS!!!! The subscribed item is.......")
                console.log(this.user);
                console.log(this.user.items);
                console.log(this.user.items[1]);
                console.log(this.user.items[1].char);
                this.char = user.items[1].char;*/
                console.log("WE GOT A BITE!");
                this.userService.getUser(userID).subscribe((user: User) => {
                  console.log("hiya there, the user extracted is");
                  console.log('user');
                  this.user = user;
                  console.log("COOL!");
                  console.log('The user from the study component is....');
                  console.log(this.user);
                  console.log(this.user.items[1].char);
                  this.char = this.user.items[1].char;
                  console.log(this.char);
                });
        });
  }

  onCheck(){
    console.log("BAKAW!!!");
  
  }
}
