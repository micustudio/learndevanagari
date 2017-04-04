import { Component, AfterViewInit }from '@angular/core';
import { User } from '../user-module/user.model';
import { UserService } from '../user-module/user.service';
import { Item } from '../item-module/item.model';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})
export class StatsComponent implements AfterViewInit {
user: User;
items: Item[];
seenItems: Item[];
unseenItems: Item[];
mostCorrect: Item;
highestStreak: Item;
dataRetrieved: boolean = false;

  constructor(private userService: UserService) { }

  ngAfterViewInit() {
    const userId = localStorage.getItem('userId'); 
    this.userService.getUserById(userId).subscribe(
          (user: User) => { 
              this.seenItems = [];
              this.unseenItems = [];
              this.items = user.items;
              //initial value
              this.mostCorrect = this.items[0];
              this.highestStreak = this.items[0];

              for(let i = 0; i < this.items.length; i++ ){
                if(this.items[i].unseen == false ){
                  this.seenItems.push(this.items[i]);
                }
                else {
                  this.unseenItems.push(this.items[i]);
                }
                if(this.items[i].correct > this.mostCorrect.correct)
                  this.mostCorrect = this.items[i];
                if(this.items[i].highestStreak > this.highestStreak.highestStreak)
                  this.highestStreak = this.items[i];
              }
              this.seenItems.sort(function (a, b) {
                return (b.correct/(b.correct+b.incorrect)) - (a.correct/(a.correct+a.incorrect));
              });
              console.log(this.highestStreak);
              console.log(this.mostCorrect);
              this.dataRetrieved = true;
            });
      }

      setColor(item: Item ){
        let score = (item.correct / (item.correct + item.incorrect)) * 100;
        if(90 <= score && score <= 100 ){
          return '#43A047';
        }
        else if (80 <= score && score <= 89 ){
          return '#7CB342';
        }
        else if (70 <= score && score <= 79 ){
          return '#43A047';
        }
        else if (60 <= score && score <= 69 ){
          return '#FDD835';
        }
        else if (50 <= score && score <= 59 ){
          return '#FFB300';
        }
        else if (40 <= score && score <= 49 ){
          return '#FB8C00';
        }
        else{
          return '#F4511E';
        }
      }
      setUnseenColor(){
        return '#B0BEC5';
      }

}