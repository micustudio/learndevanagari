import { Injectable } from '@angular/core';
import { Http, Response, Headers } from "@angular/http";
import 'rxjs/Rx';
import { Observable } from "rxjs";
import { domain } from '../app.domain';
import { Admin } from "./admin.model"

@Injectable()
export class AdminService {

  constructor(private http: Http) { }

      signup(admin: Admin){
        const body = JSON.stringify(admin);
        console.log("The body is!!!!");
        console.log(body);
        const headers = new Headers({'Content-Type': 'application/json'});
        return this.http.post(domain + 'admin', body, {headers: headers})
                .map((response: Response) => response.json())
                .catch((error: Response) => Observable.throw(error.json()));
    }

}
