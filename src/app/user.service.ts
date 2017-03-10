import { Injectable } from '@angular/core';
import { Http, Response, Headers } from "@angular/http";
import 'rxjs/Rx';
import { Observable } from "rxjs";

import { domain } from './app.domain';
import { User } from './user-module/user.model';


@Injectable()
export class UserService {

  constructor(private http: Http) { }

    signup(user: User){
        const body = JSON.stringify(user);
        console.log("The body for USER is!!!!");
        console.log(body);
        const headers = new Headers({'Content-Type': 'application/json'});
        return this.http.post(domain + 'user/', body, {headers: headers})
                .map((response: Response) => response.json())
                .catch((error: Response) => Observable.throw(error.json()));
    }



}
