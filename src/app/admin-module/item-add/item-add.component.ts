import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";

import { ItemService } from "../../item-module/item.service";
import { Item } from "../../item-module/item.model";

@Component({
  selector: 'app-item-add',
  templateUrl: './item-add.component.html',
  styleUrls: ['./item-add.component.css']
})
export class ItemAddComponent implements OnInit {
  item: Item;

  constructor(private itemService: ItemService) { }

    onPublish(form: NgForm){
        if (this.item){
            // Edit Item
            this.item.char        = form.value.char;
            this.item.letter      = form.value.letter;
            this.item.category    = form.value.category;
            this.item.translation = form.value.translation;
            this.item.combination = form.value.combination;
            this.itemService.updateItem(this.item)
                    .subscribe(
                        result => console.log(result)
                    );
            this.item = null;
        }
        else {
            // Create Item
        const item = new Item(form.value.char, 
                              form.value.letter, 
                              form.value.category, 
                              form.value.translation,
                              form.value.combination);

        console.log("THE ITEM THAT IS GOING TO BE SHOT OFF IN ITEM-ADD COMPONENT IS");
        console.log(item);
        this.itemService.addItem(item)
                .subscribe(
                    data => console.log(data),
                    error => console.log(error)
                );
        }
        //form.resetForm();
    }

    onClear(form: NgForm){
        this.item = null;
        form.resetForm();
    }

    


  ngOnInit() {
  }

}
