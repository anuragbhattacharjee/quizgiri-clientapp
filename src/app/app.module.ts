import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpModule } from '@angular/http';

//Third party libraries
import { AngularFontAwesomeModule } from 'angular-font-awesome';

//import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

// used to create fake backend
import { fakeBackendProvider } from './_helpers';
import { MultiselectDropdownModule } from 'angular-2-dropdown-multiselect';

import { AppComponent } from './app.component';
import { routing } from './app.routing';

import { AlertComponent } from './_directives';
import { AuthGuard } from './_guards';
import { JwtInterceptor, ErrorInterceptor } from './_helpers';
import { AlertService, AuthenticationService, UserService } from './_services';
import { HomeComponent } from './home';
import { ModalComponent } from './modal';
import { ShowErrorsComponent } from './show-error';
import { CategoryComponent } from './category';
import { TopicComponent } from './topic';
import { AdditionComponent } from './addition';
import { AdminComponent } from './admin';
import { LoginComponent } from './login';
import { RegisterComponent } from './register';
import { DataService } from './_services/data.service';
import {DataResolve} from './resolve';


@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        routing,
        HttpModule,
        AngularFontAwesomeModule,
        MultiselectDropdownModule
        // NgMultiSelectDropDownModule.forRoot()
    ],
    declarations: [
        AppComponent,
        AlertComponent,
        HomeComponent,
        LoginComponent,
        RegisterComponent,
        CategoryComponent,
        AdminComponent,
        TopicComponent,
        AdditionComponent,
        ModalComponent,
        ShowErrorsComponent
    ],
    providers: [
        DataService,
        DataResolve,
        AuthGuard,
        AlertService,
        AuthenticationService,
        UserService,
        // { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        // { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

        // provider used to create fake backend
        // fakeBackendProvider,
        // {
        //     provide: APP_INITIALIZER,
        //     useFactory: (data: DataService) => data.getCategories(),
        //     deps: [DataService],
        //     multi: true
        // }
    ],
    bootstrap: [AppComponent]
})

export class AppModule {
    constructor(private _dataService: DataService) {

    }
}