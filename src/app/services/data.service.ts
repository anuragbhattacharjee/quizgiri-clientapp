import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class DataService {

  prodAddress = "https://quizgiri.herokuapp.com/tasks";
  localAddress = "http://localhost:5000/tasks";
  result;
  constructor(private _http : Http) { }
  getStudetns(){
    return this._http.get(this.prodAddress).map( result => 
        this.result = result.json()
    );
  }
  
}