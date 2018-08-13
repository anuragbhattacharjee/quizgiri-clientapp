import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
 
import { User } from '../_models';
 
@Injectable()
export class UserService {
    serverAddress = "https://quizgiri.herokuapp.com/tasks";
    // serverAddress = "http://localhost:5000/api/";

    constructor(private http: HttpClient) { }
 
    getAll() {
        return this.http.get<User[]>(`${config.apiUrl}/users`);
    }
 
    getById(id: number) {
        return this.http.get(`${config.apiUrl}/users/` + id);
    }
 
    register(user: User) {
        // return this.http.post(`${config.apiUrl}/users/register`, user);

        const headers = new HttpHeaders()
                .set('Authorization', 'my-auth-token')
                .set('Content-Type', 'application/json');
    
        return this.http.post(this.serverAddress + 'admin/create', JSON.stringify(user), {
            headers: headers
        });
        // .subscribe(data => {
        //     console.log(data);
        // });

    }
 
    update(user: User) {
        return this.http.put(`${config.apiUrl}/users/` + user.id, user);
    }
 
    delete(id: number) {
        return this.http.delete(`${config.apiUrl}/users/` + id);
    }
}