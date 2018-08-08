import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { DataService } from './_services/data.service';
import { Subscription } from 'rxjs/Subscription';

@Injectable()
export class DataResolve implements Resolve<any> {

    constructor(private dataservice: DataService) { }
    
    resolve(route: ActivatedRouteSnapshot,
            state: RouterStateSnapshot): Observable<any> {
            
                return this.dataservice.getCategories();
    }
}