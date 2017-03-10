import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemService } from './item.service';
import { ItemComponent } from './item/item.component';
import { ItemListComponent } from './item-list/item-list.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ItemComponent, ItemListComponent],
  providers: [ItemService],
    exports: [
        ItemComponent,
        ItemListComponent
    ]
})
export class ItemModule { }
