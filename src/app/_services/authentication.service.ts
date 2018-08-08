import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { DataService } from './data.service';
 
@Injectable()
export class AuthenticationService {
    constructor(private http: HttpClient, private _dataService: DataService) { }
    adminUsers: any = [];
    login(username: string, password: string) {
        this._dataService.getAdminUsers().subscribe( res => {
            this.adminUsers = res;
        });

        this.adminUsers.forEach(admin => {
            if(admin.username === username && admin.password === password){
                localStorage.setItem('currentUser', JSON.stringify(admin));
            }
        });
        if(localStorage.getItem('currentUser')) return true;
        else return false;
        // return this.http.post<any>(`${config.apiUrl}/users/authenticate`, { username: username, password: password })
        //     .pipe(map(user => {
        //         // login successful if there's a jwt token in the response
        //         if (user && user.token) {
        //             // store user details and jwt token in local storage to keep user logged in between page refreshes
        //             localStorage.setItem('currentUser', JSON.stringify(user));
        //         }
 
        //         return user;
        //     }));
    }
 
    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
    }
}