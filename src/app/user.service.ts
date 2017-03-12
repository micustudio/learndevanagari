import { Injectable, EventEmitter } from '@angular/core';
import { Http, Response, Headers } from "@angular/http";
import 'rxjs/Rx';
import { Observable } from "rxjs";
import { domain } from './app.domain';
import { User } from './user-module/user.model';


@Injectable()
export class UserService {
  user: User;
  signedUserID = new EventEmitter<string>();

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
                .map((response: Response) => {
                    const result = response.json();
                    console.log("The result is: ");
                    console.log(result)
                    return result;
                })
                .catch((error: Response) => Observable.throw(error.json()));
    }

    logout() {
        localStorage.clear();
    }

    isLoggedIn() {
        return localStorage.getItem('token') !== null;
    }

    emitUserID(userID: string){
        this.signedUserID.emit(userID);
        console.log("The emit user from the user service end!");
    }

    getUser(userID: string) {
    const headers = new Headers({'Content-Type': 'application/json'});
    return this.http.get(domain + 'user/' + userID)
                .map((response: Response) => {
                    const result = response.json();
                    console.log("The result from the GETUSER method from service is: ");
                    console.log(result)
                    let user = new User(
                                result.user.username,
                                result.user.email,
                                result.user.password,
                                result.user.fullName,
                                result.user.profilePic,
                                result.user.location,
                                result.user.biography,
                                result.user.date,
                                result.user.items);
                    console.log("tHE NEW FREAKING USER IS...");
                    console.log(user);
                    return user;
                })
                .catch((error: Response) => Observable.throw(error.json()));
    }

}
