import { Component, OnInit, AfterViewInit, ViewChildren } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { UserService } from '../user-module/user.service';
import { User } from '../user-module/user.model';
import { Item } from '../item-module/item.model';

import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';

@Component({
  selector: 'app-study',
  templateUrl: './study.component.html',
  styleUrls: ['./study.component.css']
})
export class StudyComponent implements OnInit, AfterViewInit {
  @ViewChildren('input') vc;
  user: User;
  initialLevel: number;
  level: number;
  leveledUp: boolean = false
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
  englishLetter: string;

  // stats
  totalCorrect: number = 0;
  totalIncorrect: number = 0;
  percentageCorrect: string;
  expFromLevel: number;
  progressPercent: number;

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
        this.totalCorrect++;
        this.user.items[this.rand].correct++;
        this.user.items[this.rand].streak++;
        if(this.user.items[this.rand].streak > 2){
            this.user.items[this.rand].rank += 2;
            this.user.exp += 2;
        }
        else{
            this.user.items[this.rand].rank++;
            this.user.exp++;
        }
        if (this.user.items[this.rand].streak > this.user.items[this.rand].highestStreak){
            this.user.items[this.rand].highestStreak = this.user.items[this.rand].streak;
        }
    }
    // If the item is Incorrect
    else{
        this.correct = false;
        this.totalIncorrect++;
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
    this.setProgress();

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
                    this.englishLetter = this.user.items[this.rand].letter;
                    this.unseen = this.user.items[this.rand].unseen;
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
                                data.exp,
                                data.date,
                                data.items,
                                data.userId);
                    console.log("The  user ON ngINIT IS.....");
                    console.log(user);
                    this.user = user;
                    this.userService.setUser(this.user);
                    this.initialLevel = Math.floor(Math.sqrt(this.user.exp));
                    this.setProgress();
                    // ITEM
                    this.items = user.items;
                    this.max = this.user.items.length;
                    this.rand = this.getRandomIntInclusive(0, this.max);
                    this.character = this.user.items[this.rand].char;
                    this.englishLetter = this.user.items[this.rand].letter;
                    this.unseen = this.user.items[this.rand].unseen;
                    this.nextNewItem = true;
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

  setProgress(){
      // PROGRESS BAR
        this.level = Math.floor(Math.sqrt(this.user.exp));
        if(this.level != this.initialLevel) {
            this.leveledUp = true;
            this.initialLevel = this.level;
        }
        else {
            this.leveledUp = false;
        }
        this.expFromLevel = this.user.exp - Math.pow((this.level), 2);
        console.log(`THE EXP FROM ORIGINAL LEVEL IS...: ${this.expFromLevel}`);
        this.progressPercent = (this.expFromLevel / (Math.pow((this.level + 1), 2) - Math.pow(this.level, 2))) * 100;
        console.log(`THE PROGRESS PERECENT IS....: ${this.progressPercent}`);
        if(this.totalCorrect + this.totalIncorrect != 0){
            this.percentageCorrect = ((this.totalCorrect / (this.totalCorrect + this.totalIncorrect))*100).toFixed(0);
        }
        else {
            this.percentageCorrect = '0';
        }
        

  }

  setProgressWidth() {
      return `${this.progressPercent}%`;
  }

}
