import { Component, OnInit, AfterContentInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { UserService } from '../user.service';
import { User } from '../user-module/user.model';
import { Item } from '../item-module/item.model';
import { trigger, state, style, transition, animate, keyframes } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';

@Component({
  selector: 'app-study',
  templateUrl: './study.component.html',
  styleUrls: ['./study.component.css']
})
export class StudyComponent implements OnInit /*, AfterContentInit */{
  myForm: FormGroup;
  user: User;
  items: Item[];
  rand: number;
  max: number;
  character: string;
  saved: [{
      savedChar: string,
      correct: boolean
  }]

  constructor(private userService: UserService) { }

  ngOnInit(){
        this.userService.getUser().subscribe(
                data => {
                    let user = new User(
                                data.username,
                                data.email,
                                data.password,
                                data.fullName,
                                data.profilePic,
                                data.location,
                                data.biography,
                                data.date,
                                data.items);
                    console.log("The  user ON INIT IS.....");
                    console.log(user);
                    this.user = user;
                    this.items = user.items;
                    this.max = this.user.items.length;
                    this.rand = this.getRandomIntInclusive(0, this.max);
                    this.character = this.user.items[this.rand].char;
                    // console.log(this.character);
                    // console.log(this.user.items.length);
                    // for(let i = 0; i < this.user.items.length; i++){
                    //   this.characters.push(this.user.items[i].char);
                    // }
                    // console.log(this.characters);
                    console.log(this.items);
                },
                error => console.error(error)
            )
        this.myForm = new FormGroup({
            check: new FormControl(null, Validators.required)
        });
  }

  /*ngAfterContentInit() {
        this.myForm = new FormGroup({
            check: new FormControl(null, Validators.required)
        });
        this.user = this.userService.fetchStoredUser();
        console.log("The user for study component issssss");

        if(this.user){
        console.log(this.user);
        console.log(this.user.items);
        this.character = this.user.items[0].char;
        
  } */

  onCheck(){
    console.log("BAKAW!!!");
    this.rand = this.getRandomIntInclusive(0, this.max);
    this.character = this.user.items[this.rand].char;
  }

  getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

}
