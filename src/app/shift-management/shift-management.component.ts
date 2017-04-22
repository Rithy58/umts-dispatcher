import { Component, OnInit } from '@angular/core';

import { Shift } from './shift';
import { ShiftService } from './shift.service';

@Component({
  selector: 'shift-management',
  templateUrl: './shift-management.component.html',
  styleUrls: [ './shift-management.component.css' ]
})
export class ShiftManagementComponent implements OnInit {

  // Clients local Shift[] array for displaying
  shifts: Shift[] = [];

  // Listener for all shifts
  getShiftsConnection;

  constructor(private ShiftService: ShiftService) { }

  ngOnInit(): void {
    this.ShiftService.getShiftByDay(new Date(2017,3,17,0,0,0,0));
    this.getShiftsConnection = this.ShiftService.getShifts()
      .subscribe(array => {
        for (let i in array) {
          // create a Shift object in the front end for each shift JSON.
          var shift = array[i];
          let inShiftArr = false;
          // If this shift is already in the array, just update the data.
          this.shifts.forEach(function(s) {
            if (s.id === shift.id) {
              inShiftArr = true;
              s.updateData(shift.start_time, shift.end_time,
                shift.start_location, shift.end_location,
                shift.route, shift.driver_id, shift.bus_id);
            }
          });
          // Insert if we didnt find it.
          if (inShiftArr === false) {
            this.shifts.push(new Shift(shift.id, shift.start_time,
              shift.end_time, shift.start_location, shift.end_location,
              shift.route, shift.driver_id, shift.bus_id));
          }
        }
      })
  }

  ngOnDestroy() {
    this.getShiftsConnection.unsubscribe();
  }
}
