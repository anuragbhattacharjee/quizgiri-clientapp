import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import 'rxjs/add/operator/map';

@Injectable()
export class DataService {
  categories: any = [];
  myOptions: any = [];

  serverAddress = 'https://quizgiri.herokuapp.com/tasks';
  // serverAddress = "http://localhost:5000/api/";
  result;
  constructor(private _http: HttpClient) { }
  shootModal = false;

  getStudetns() {
    return this._http.get(this.serverAddress + "task").map(result =>
      this.result = result
    );
  }

  getAdmins() {
    return this._http.get(this.serverAddress + "admin").map(result =>
      this.result = result
    );
  }

  getCategories() {
    return this._http.get(this.serverAddress + "categories")
    .map( res => {
      this.categories = res;
      for (let i = 0; i < this.categories.length; i++) {
          this.myOptions.push({ id: this.categories[i]._id, name: this.categories[i].name });
      }
    });
  }

  createCategory(category) {

    const headers = new HttpHeaders()
      .set('Authorization', 'my-auth-token')
      .set('Content-Type', 'application/json');

    return this._http.post(this.serverAddress + 'category/create', JSON.stringify(category), {
      headers: headers
    });
  }

  createTopic(topic) {
    const headers = new HttpHeaders()
      .set('Authorization', 'my-auth-token')
      .set('Content-Type', 'application/json');

    return this._http.post(this.serverAddress + 'topic/create', JSON.stringify(topic), {
      headers: headers
    });
  }

  createQuestion(question) {
    const headers = new HttpHeaders()
    .set('Authorization', 'my-auth-token')
    .set('Content-Type', 'application/json');
    console.log(question);
    return this._http.post(this.serverAddress + 'question/create', JSON.stringify(question), {
      headers: headers
    });
  }

  getTopics() {
    return this._http.get(this.serverAddress + 'detailTopics');
  }

  getDetailsCategories() {
    return this._http.get(this.serverAddress + "detailCategories");
  }

  getAdminUsers() {
    return this._http.get(this.serverAddress + "admin").map(result =>
      this.result = result
    );
  }

}