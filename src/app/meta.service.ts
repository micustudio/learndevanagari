import { Injectable } from '@angular/core';
import { Http, Response, Headers } from "@angular/http";
import 'rxjs/add/operator/map';
import { domain } from './app.domain';

@Injectable()
export class MetaService {
  private twitterCount: number;

  constructor(private http: Http) { 
    
  }

    getTwitterFollowers(){
      console.log("Hello from the MEta SERVICE! before I get to get some FOLLOWERS");
        return this.http.get(domain + 'meta/twitter')
                .map((response: Response) => {
                    console.log("The RESPONSE IS:");
                    console.log(response)
                    const retrievedItems = response.json().obj;
                console.log("The retrieved items from the Meta Service are :" + retrievedItems);
                    this.twitterCount = retrievedItems;
                    return retrievedItems;
                });
    }

}
