import { Component, OnInit, Input } from '@angular/core';
import { Item } from '../item-module/item.model';

@Component({
  selector: 'app-learninstance',
  templateUrl: './learninstance.component.html',
  styleUrls: ['./learninstance.component.css']
})
export class LearninstanceComponent implements OnInit {
  @Input() item: Item;

  constructor() { }

  ngOnInit() {
  }

}
