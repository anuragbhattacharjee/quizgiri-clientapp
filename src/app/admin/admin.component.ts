import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { DataService } from '../_services/data.service';

@Component({
    templateUrl: 'admin.component.html'
})

export class AdminComponent implements OnInit {
    admins: any = [];

    constructor(private _dataService: DataService) {
        this.getAdmins();

    }

    ngOnInit() {
    }

    getAdmins() {
        this._dataService.getAdmins().subscribe(res => {
            this.admins = res;
        });
    }

    deleteAdmin(username){
        console.log(username);
    }
}