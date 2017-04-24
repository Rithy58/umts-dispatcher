import { NgModule }       from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { FormsModule }    from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '@angular/material';

import { AppComponent }         from './app.component';
import { SidenavComponent }       from './sidenav/sidenav.component';
import { ShiftManagementComponent }   from './shift-management/shift-management.component';
import { ShiftManagementCreateNewDialog }   from './shift-management/shift-management.component';
import { BusManagementComponent } from './bus-management/bus-management.component';
import { RouteManagementComponent }   from './route-management/route-management.component';
import { DriverManagementComponent }   from './driver-management/driver-management.component';
import { ShiftService }          from './shift-management/shift.service';
import { BusService }     from './bus-management/bus.service';
import { RouteService }          from './route-management/route.service';
import { DriverService }          from './driver-management/driver.service';
import { AddDriverDialog }          from './driver-management/driver-management.component';

import { AppRoutingModule }     from './app-routing.module';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule.forRoot()
  ],
  declarations: [
    AppComponent,
    SidenavComponent,
    ShiftManagementComponent,
    ShiftManagementCreateNewDialog,
    BusManagementComponent,
    DriverManagementComponent,
    RouteManagementComponent,
    AddDriverDialog,
  ],
  entryComponents: [ShiftManagementCreateNewDialog, AddDriverDialog],
  providers: [ ShiftService, BusService, RouteService, DriverService ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
