import { Injectable, EventEmitter } from '@angular/core';
import { Http, Response, Headers } from "@angular/http";
import 'rxjs/Rx';
import { Observable } from "rxjs";
import { domain } from './app.domain';
import { User } from './user-module/user.model';


@Injectable()
export class UserService {
  user: User;

  constructor(private http: Http) { }

    signup(user: User){
        const body = JSON.stringify(user);
        console.log("The body for USER is!!!!");
        console.log(body);
        const headers = new Headers({'Content-Type': 'application/json'});
        return this.http.post(domain + 'user/', body, {headers: headers})
                .map((response: Response) => {
                  const retrievedUser = response.json();
                  console.log("The retrievedUser is ");
                  console.log(retrievedUser);
                })
                .catch((error: Response) => Observable.throw(error.json()));
    }

    signin(user: User) {
    const body = JSON.stringify(user);
    const headers = new Headers({'Content-Type': 'application/json'});
    return this.http.post(domain + 'user/signin', body, {headers: headers})
                .map((response: Response) => {response.json()})
                .catch((error: Response) => Observable.throw(error.json()));
    }

}
