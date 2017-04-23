import { NgModule }       from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { FormsModule }    from '@angular/forms';
import {MdSidenavModule} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { AppComponent }         from './app.component';
import {SidenavComponent}       from './sidenav/sidenav.component';
import { ShiftManagementComponent }   from './shift-management/shift-management.component';
import {BusManagementComponent} from './bus-management/bus-management.component';
import { RouteManagementComponent }   from './route-management/route-management.component';
import { DriverManagementComponent }   from './driver-management/driver-management.component';
import { ShiftService }          from './shift-management/shift.service';
import {BusService}     from './bus-management/bus.service';
import { RouteService }          from './route-management/route.service';
import { DriverService }          from './driver-management/driver.service';

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
    SidenavComponent,
    ShiftManagementComponent,
    BusManagementComponent,
    DriverManagementComponent,
    RouteManagementComponent
  ],
  providers: [ ShiftService, BusService, RouteService, DriverService ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
