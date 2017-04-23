import { Component, OnInit } from '@angular/core';

import { Driver } from './driver';
import { DriverService } from './driver.service';

@Component({
  selector: 'driver-management',
  templateUrl: './driver-management.component.html',
  styleUrls: [ './driver-management.component.css' ]
})
export class DriverManagementComponent implements OnInit {

  // Clients local Driver[] array for displaying
  drivers: Driver[] = [];

  // Listener for all drivers
  getDriversConnection;

  constructor(private DriverService: DriverService) { }

  ngOnInit(): void {
    this.DriverService.getAllDrivers();
    this.getDriversConnection = this.DriverService.getDrivers()
      .subscribe(array => {
        for (let i in array) {
          // create a Driver object in the front end for each driver JSON.
          var driver = array[i];
          let inDriverarr = false;
          // If this driver is already in the array, just update the data.
          this.drivers.forEach(function(d) {
            if (d.id === driver.id) {
              inDriverarr = true;
              d.updateData(driver.name, driver.phone, driver.late_count);
            }
          });
          // Insert if we didnt find it.
          if (inDriverarr === false) {
            this.drivers.push(new Driver(driver.id, driver.name, driver.phone, driver.late_count));
          }
        }
      })
  }

  ngOnDestroy() {
    this.getDriversConnection.unsubscribe();
  }
}
