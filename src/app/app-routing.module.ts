import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Import components here.
import { ShiftManagementComponent }   from './shift-management/shift-management.component';
import { BusManagementComponent }   from './bus-management/bus-management.component';
import { RouteManagementComponent }   from './route-management/route-management.component';
import { DriverManagementComponent }   from './driver-management/driver-management.component';

const routes: Routes = [
  { path: '', redirectTo: '/shifts', pathMatch: 'full' },
  { path: 'shifts',  component: ShiftManagementComponent },
  { path: 'drivers',  component: DriverManagementComponent },
  { path: 'routes',  component: RouteManagementComponent },
  { path: 'buses',  component: BusManagementComponent },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
