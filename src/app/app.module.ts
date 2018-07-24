import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { DataService } from './services/data.service';

import { Provider } from '@angular/core';
import { BrowserXhr } from '@angular/http';
//import {CustExtBrowserXhr} from './app/path-to-file/cust-ext-browser-xhr';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    HttpModule,
    BrowserModule
  ],
  providers: [
    DataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
