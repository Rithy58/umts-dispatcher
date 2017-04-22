import { NgModule }       from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { FormsModule }    from '@angular/forms';
import {MdSidenavModule} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { AppComponent }         from './app.component';
import { ShiftManagementComponent }   from './shift-management/shift-management.component';
import { ShiftService }          from './shift-management/shift.service';


import { AppRoutingModule }     from './app-routing.module';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MdSidenavModule
  ],
  declarations: [
    AppComponent,
    ShiftManagementComponent,
  ],
  providers: [ ShiftService ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
