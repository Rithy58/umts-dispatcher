import { Component, OnInit } from '@angular/core';
import {MdDialog, MdDialogRef} from '@angular/material';

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

  selectedOption: string;

  constructor(private ShiftService: ShiftService, public dialog: MdDialog) { }

  addShift(startDate, startTime, endDate, endTime,
    startLoc, endLoc, route, driverID, busID): void {
      var startD = startDate + "T" + startTime + ":00Z";
      var endD = endDate + "T" + endTime + ":00Z";
      console.log(startD);
      this.ShiftService.addShift(startD, endD, startLoc, endLoc, route, driverID, busID);
  }

  ngOnInit(): void {
    this.ShiftService.connect();
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

  openDialog() {
    let dialogRef = this.dialog.open(ShiftManagementCreateNewDialog);
    dialogRef.afterClosed().subscribe(res => {
      this.addShift(res[0],res[1],res[2],res[3],res[4],res[5],res[6],res[7],res[8]);
    });
  }

}

@Component({
  selector: 'shift-management-create-new-dialog',
  templateUrl: './shift-management-create-new-dialog.html',
})
export class ShiftManagementCreateNewDialog {
  constructor(public dialogRef: MdDialogRef<ShiftManagementCreateNewDialog>) {}
}
