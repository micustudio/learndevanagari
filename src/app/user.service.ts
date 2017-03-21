import { Injectable, EventEmitter } from '@angular/core';
import { Http, Response, Headers } from "@angular/http";
import 'rxjs/Rx';
import { Observable } from "rxjs";
import { domain } from './app.domain';
import { User } from './user-module/user.model';
import { Item } from './item-module/item.model';

@Injectable()
export class UserService {
  user: User;
  signedUpSign: boolean = false;
  signedUser = new EventEmitter<User>();

  constructor(private http: Http) { }

    signedUpMessage(){
        this.signedUpSign = true;
    }
    signedUpSuccessful(){
        return this.signedUpSign;
    }

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


    updateItem(item: Item){
        const body = JSON.stringify(item);
        console.log("The stringified json body is");
        console.log(body);
        const token = localStorage.getItem('token') 
                    ? '?token=' + localStorage.getItem('token')
                    : '';
        const headers = new Headers({'Content-Type': 'application/json'});
        return this.http.patch(domain + 'user/updateitem' + token, body, {headers: headers})
                .map((response: Response) => {
                    const result = response.json();
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

    setUser(user: User){
        this.user = user;
        this.signedUser.emit(user);
        console.log("The emit user from the user service end!");
        console.log("The emitted user is");
        console.log(user);
    }

    /*fetchStoredUser(){
        return this.user;
    }*/

    getUser() {
    const headers = new Headers({'Content-Type': 'application/json'});
    const token = localStorage.getItem('token') 
                    ? '?token=' + localStorage.getItem('token')
                    : '';
    return this.http.get(domain + 'user/signeduser' + token)
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



    getGravatar(email: string) {
    const emailObj = { email: email };
    const body = JSON.stringify(emailObj);
    console.log(body);
    const headers = new Headers({'Content-Type': 'application/json'});
    const token = localStorage.getItem('token') 
                    ? '?token=' + localStorage.getItem('token')
                    : '';
    return this.http.get(domain + 'user/gravatar' + token)
                .map((response: Response) => {
                    const result = response.json();
                    console.log("The result from the GETGRAVATAR method from service is: ");
                    console.log(result)
                    let url = result.gravatarUrl.substring(2);
                    return url;
                })
                .catch((error: Response) => Observable.throw(error.json()));
    }

}
