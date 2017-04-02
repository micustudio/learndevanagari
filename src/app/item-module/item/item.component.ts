import { Component, OnInit, Input } from '@angular/core';
//import { ItemService } from '../item.service';
import { Item } from '../item.model';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {
@Input('inputItem') item : Item;

  constructor() { }

  ngOnInit() {

  }

  onEdit(){
    console.log("Hello we doing the editing!");
  }

  onDelete() {
    console.log("We doing the alerting!");
    if (confirm('Are you sure you want to like delete this thing?') ){
      console.log("DELETED!");
    } else {
    // Do nothing!
    }
  }

}
