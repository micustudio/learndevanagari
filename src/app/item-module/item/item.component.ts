import { Component, OnInit, Input } from '@angular/core';
import { ItemService } from '../item.service';
import { Item } from '../item.model';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {
@Input('inputItem') item : Item;

  constructor(private itemService: ItemService) { }

  ngOnInit() {

  }

  onEdit(){
    console.log("Hello we doing the editing!");
    this.itemService.setItem(this.item);
    window.scrollTo(0,0);
  }

  onDelete() {
    console.log("We doing the alerting!");
    if (confirm(`Are you sure you want to like delete this thing that is ${this.item.char} ?`) ){
        console.log("DELETED!");
        this.itemService.deleteItem(this.item)
            .subscribe(
                result => console.log(result)
            );
    } 
    else {
    // Do nothing!
    }
  }

}