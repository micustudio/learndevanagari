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
      transition('0 => 1', animate('0.1s 60ms ease-out')),
      transition('1 => 0', animate('0.1s 60ms ease-in'))
    ])
  ]
})
export class StudyComponent implements OnInit, AfterViewInit {
  @ViewChildren('input') vc;
  user: User;
  nextNewItem: boolean = false;
  newHistory: boolean = false;
  myForm: FormGroup;
  items: Item[];
  rand: number;
  max: number;
  character: string;
  correct: boolean;
  unseen: boolean;
  histories = [];

  constructor(private userService: UserService) { }

  onCheck(){
    this.newHistory = false;
    this.nextNewItem = false;
    // If the item is seen for the first time.
    this.user.items[this.rand].impressions++;
    this.user.items[this.rand].unseen = false;
    // If the item is Correct
    if(this.user.items[this.rand].letter == this.myForm.value.check){
        this.correct = true;
        this.user.items[this.rand].correct++;
        this.user.items[this.rand].streak++;
        if(this.user.items[this.rand].streak > 2){
            this.user.items[this.rand].rank += 2;
            this.user.level += 2;
        }
        else{
            this.user.items[this.rand].rank++;
            this.user.level++;
        }
        if (this.user.items[this.rand].streak > this.user.items[this.rand].highestStreak){
            this.user.items[this.rand].highestStreak = this.user.items[this.rand].streak;
        }
    }
    // If the item is Incorrect
    else{
        this.correct = false;
        this.user.items[this.rand].incorrect++;
        this.user.items[this.rand].streak = 0;
        this.user.items[this.rand].rank--;
        if(this.user.items[this.rand].rank < 0){
            this.user.items[this.rand].rank = 0;
        }
    }

    let history = {
            savedChar: this.user.items[this.rand].char,
            letter: this.user.items[this.rand].letter,
            correct: this.correct
    };
    this.histories.unshift(history);
    this.newHistory = true;

    console.log("the histories array is...");
    console.log(this.histories);


    this.myForm.setValue({
      check: null
    });

    this.userService.setUser(this.user);

    // Function to calculate next item
    setTimeout(() => { 
    console.log("The item being sent off is....");
    console.log(this.user.items[this.rand]);
    this.userService.updateItem(this.user).subscribe(                
                data => {
                    console.log("THE DATA coming back IS...");
                    console.log(data);
                    this.nextNewItem = true;
                    this.newHistory = true;
                    this.rand = this.getRandomIntInclusive(0, this.max);
                    this.character = this.user.items[this.rand].char;
                },
                error => console.error(error));
        }, 500);
  }

  getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

  ngOnInit(){
        this.userService.getUser().subscribe(
                data => {
                    console.log("The data is...");
                    console.log(data);
                    let user = new User(
                                data.username,
                                data.email,
                                data.password,
                                data.fullName,
                                data.profilePic,
                                data.location,
                                data.biography,
                                data.level,
                                data.date,
                                data.items,
                                data.userId);
                    console.log("The  user ON INIT IS.....");
                    console.log(user);
                    this.user = user;
                    this.userService.setUser(this.user);
                    this.items = user.items;
                    this.max = this.user.items.length;
                    this.rand = this.getRandomIntInclusive(0, this.max);
                    this.character = this.user.items[this.rand].char;
                    this.unseen = this.user.items[this.rand].unseen;
                    this.nextNewItem = true;
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

  correctColor(right: boolean){
      let hexString;
      if(right == true)
        hexString = '#2ecc71';
      else 
        hexString = '#e74c3c';
      return hexString;
  }


}
