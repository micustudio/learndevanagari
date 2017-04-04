import { Component, OnInit } from '@angular/core';
import { Item } from '../item-module/item.model';
import { ItemService } from '../item-module/item.service';

@Component({
  selector: 'app-learn',
  templateUrl: './learn.component.html',
  styleUrls: ['./learn.component.css']
})
export class LearnComponent implements OnInit {
  items: Item[];

  constructor(private itemService: ItemService) { }

  ngOnInit() {
    this.items = [];  
    this.itemService.getItems().subscribe(
          (items: Item[] ) => {
                for(let item of items){
                  this.items.push(item);
                }
                console.log(this.items[0]);
                console.log("the char item is...." + this.items[0].char);
          });
  }

}
