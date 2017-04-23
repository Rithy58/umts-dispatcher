import { NgModule }       from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { FormsModule }    from '@angular/forms';
import {MdSidenavModule} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { AppComponent }         from './app.component';
import { ShiftManagementComponent }   from './shift-management/shift-management.component';
import { DriverManagementComponent }   from './driver-management/driver-management.component';
import { BusManagementComponent } from './bus-management/bus-management.component';
import { RouteManagementComponent } from './route-management/route-management.component';
import { BusService }     from './bus-management/bus.service';
import { ShiftService }          from './shift-management/shift.service';
import { DriverService }          from './driver-management/driver.service';
import { RouteService }          from './route-management/route.service';


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
    BusManagementComponent,
    RouteManagementComponent,
    DriverManagementComponent,
  ],
  providers: [ ShiftService,BusService, RouteService, DriverService ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
