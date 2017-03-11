import { Injectable, EventEmitter } from '@angular/core';
import { Http, Response, Headers } from "@angular/http";
import 'rxjs/Rx';
import { Observable } from "rxjs";
import { Router } from '@angular/router';

import { domain } from './app.domain';
import { User } from './user-module/user.model';


@Injectable()
export class UserService {
  user: User;

  constructor(private http: Http,
              private router: Router) { }

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
                  this.router.navigateByUrl('/signin');
                })
                .catch((error: Response) => Observable.throw(error.json()));
    }

    signin(user: User) {
    const body = JSON.stringify(user);
    const headers = new Headers({'Content-Type': 'application/json'});
    return this.http.post(domain + 'user/signin', body, {headers: headers})
                .map((response: Response) => {
                  const retrievedUser = response.json();
                  this.router.navigateByUrl('/home');
              })
                .catch((error: Response) => Observable.throw(error.json()));
    }

}
