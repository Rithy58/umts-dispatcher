import { Component, OnInit } from '@angular/core';

import { Bus } from './bus';
import { BusService } from './bus.service';

@Component({
  selector: 'bus-management',
  templateUrl: './bus-management.component.html',
  styleUrls: [ './bus-management.component.css' ]
})
export class BusManagementComponent implements OnInit {

  // Clients local Bus[] array for displaying
  buses: Bus[] = [];

  // Listener for all buses
  getBusConnection;

  constructor(private BusService: BusService) { }

  ngOnInit(): void {
    this.BusService.getTheBuses();
    this.getBusConnection = this.BusService.getAllBuses()
      .subscribe(array => {
        for (let i in array) {
          // create a Driver object in the front end for each driver JSON.
          var bus = array[i];
          let inBusarr = false;
          // If this driver is already in the array, just update the data.
          this.buses.forEach(function(currBus) {
            if (currBus.id === bus.id) {
              inBusarr = true;
              currBus.updateData(bus.type, bus.defects);
            }
          });
          // Insert if we didnt find it.
          if (inBusarr === false) {
            this.buses.push(new Bus(bus.id, bus.type, bus.defects));
          }
        }
      })
  }

  ngOnDestroy() {
    this.getBusConnection.unsubscribe();
  }
}
