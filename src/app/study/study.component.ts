import { Component, OnInit, AfterViewInit, ViewChildren } from '@angular/core';
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
  styleUrls: ['./study.component.css'],
      animations: [
    trigger('visibilityChanged', [
      state('true' , style({ opacity: 1 })),
      state('false', style({ opacity: 0 })),
      transition('0 => 1', animate('0.1s 100ms ease-out')),
      transition('1 => 0', animate('0.1s 100ms ease-in'))
    ])
  ]
})
export class StudyComponent implements OnInit, AfterViewInit {
  @ViewChildren('input') vc;
  newItem: boolean = false;
  myForm: FormGroup;
  user: User;
  items: Item[];
  rand: number;
  max: number;
  character: string;
  history: [{
      savedChar: string,
      correct: boolean
  }] = null;

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
                    this.newItem = true;
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

  ngAfterViewInit() {
      this.vc.first.nativeElement.focus();
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
    this.newItem = false;
    this.myForm.setValue({
      check: null
    });
    console.log("BAKAW!!!");
    //function to calculate next item
    this.rand = this.getRandomIntInclusive(0, this.max);
    setTimeout(() => { 
    this.character = this.user.items[this.rand].char;
    console.log("The item being sent off is....");
    console.log(this.user.items[this.rand]);
    this.userService.updateItem(this.user.items[this.rand]).subscribe(                
                data => {
                    console.log("THE DATA coming back IS...");
                    console.log(data);
                    this.newItem = true;
                },
                error => console.error(error));
        }, 500);
  }

  getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

}
