import { NgModule }       from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { FormsModule }    from '@angular/forms';
import {MdSidenavModule} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { AppComponent }         from './app.component';
import { ShiftManagementComponent }   from './shift-management/shift-management.component';
import {BusManagementComponent} from './bus-management/bus-management.component';
import {BusService}     from './bus-management/bus.service';
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
    BusManagementComponent
  ],
  providers: [ ShiftService,BusService ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
