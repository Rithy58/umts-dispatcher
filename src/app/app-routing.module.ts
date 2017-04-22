import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Import components here.
import { ShiftManagementComponent }   from './shift-management/shift-management.component';

const routes: Routes = [
  { path: '', redirectTo: '/shifts', pathMatch: 'full' },
  { path: 'shifts',  component: ShiftManagementComponent },
  // { path: 'drivers',  component: DriverManagementComponent },
  // { path: 'routes',  component: RouteManagementComponent },
  // { path: 'incidents',  component: IncidentManagementComponent },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
