import { Injectable } from '@angular/core';
import { Http, Response, Headers } from "@angular/http";
import 'rxjs/Rx';
import { Observable } from "rxjs";
import { domain } from './app.domain';

@Injectable()
export class ItemService {
private items: string;

  constructor(private http: Http) { }

}