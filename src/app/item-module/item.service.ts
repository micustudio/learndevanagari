import { Injectable, EventEmitter } from '@angular/core';
import { Http, Response, Headers } from "@angular/http";
import 'rxjs/Rx';
import { Observable } from "rxjs";
import { domain } from '../app.domain';

import { Item } from "./item.model";

@Injectable()
export class ItemService {
private items: Item[] = [];
editedItem = new EventEmitter<Item>();

  constructor(private http: Http) { }

      addItem(item: Item) {
        console.log("THE ITEM FROM THE ITEM SERVICE IS...");
        console.log(item);
        const body = JSON.stringify(item);
        console.log("THE JSON STRINGIFIED ITEM IS");
        console.log(body);
        const headers = new Headers({'Content-Type': 'application/json'});
        const token = localStorage.getItem('token') 
                        ? '?token=' + localStorage.getItem('token')
                        : '';
        console.log(this.items);
        return this.http.post(domain + 'item/' + token, body, {headers: headers})

        // GO TO item.js ROUTES then come back to this file

                    .map((response: Response) => {
                        const result = response.json();
                        console.log("The Result is " 
                     + result);
                      console.log(result);
                        const item = new Item(
                                result.obj.char, 
                                result.obj.letter, 
                                result.obj.category,
                                result.obj.translation,
                                result.obj.combination,
                                result.obj.correct, 
                                result.obj.incorrect, 
                                result.obj.streak, 
                                result.obj.highestStreak,
                                result.obj.rank, 
                                result.obj.unseen, 
                                result.obj.impressions,
                                result.obj.date,
                                result.obj._id
                                );
                        console.log("The new Item is " + item);
                        this.items.push(item);
                        return this.items;
                        })
                    .catch((error: Response) => Observable.throw(error.json()));
    }



    updateItem(item: Item) {
        const body = JSON.stringify(item);
        const headers = new Headers({'Content-Type': 'application/json'});
        const token = localStorage.getItem('token') 
                        ? '?token=' + localStorage.getItem('token')
                        : '';
        console.log(this.items);
        return this.http.patch(domain + 'item/' + item.itemId + token, body, {headers: headers})
                    .map((response: Response) => response.json())
                    .catch((error: Response) => Observable.throw(error.json()));
    }


    getItems(){
        return this.http.get(domain + 'item/')
                .map((response: Response) => {
                    const retrievedItems = response.json().obj;
                    this.items = [];
                    for (let item of retrievedItems) {
                        console.log("The particular item is!!!!!!!");
                        console.log(item);
                        this.items.push(new Item(
                            item.char,
                            item.letter,
                            item.category,
                            item.translation,
                            item.combination,
                            item.correct,
                            item.incorrect,
                            item.streak,
                            item.highestStreak,
                            item.rank,
                            item.unseen,
                            item.impressions,
                            item.date,
                            item._id,
                        ));
                    }
                    return this.items;
                })
                .catch((error: Response) => Observable.throw(error.json()));
    }

    setItem(item: Item){
        this.editedItem.emit(item);
        console.log("The emitted item from the item service end!");
        console.log("The emitted user is");
        console.log(item);
    }

}