import { Injectable } from '@angular/core';
import { Http, Response, Headers } from "@angular/http";
import 'rxjs/Rx';
import { Observable } from "rxjs";

@Injectable()
export class MetaService {
  private twitterCount: number;

  constructor(private http: Http) { 
    
  }

    getTwitterFollowers(){
      console.log("Hello from the MEta SERVICE! before I get to get some FOLLOWERS");
        return this.http.get('http://localhost:4200/meta/' + 'twitter')
                .map((response: Response) => {
                    const retrievedItems = response.json().obj;
                console.log("The retrieved items from the Meta Service are :" + retrievedItems);
                    this.twitterCount = retrievedItems;
                    return retrievedItems;
                })
                .catch((error: Response) => Observable.throw(error.json()));
    }

}
