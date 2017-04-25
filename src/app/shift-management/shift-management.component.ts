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
  date = new Date();

  // Listener for all shifts
  getShiftsConnection;

  selectedOption: string;

  constructor(private ShiftService: ShiftService, public dialog: MdDialog) { }

  changeDate(newDate) {
    this.date = newDate;
    this.shifts = [];
    this.ShiftService.getShiftByDay(this.date);
  }

  addShift(startDate, startTime, endDate, endTime,
    startLoc, endLoc, route, driverID, busID): void {
      let startD = startDate + "T" + startTime + ":00Z";
      let endD = endDate + "T" + endTime + ":00Z";
      this.ShiftService.addShift(startD, endD, startLoc, endLoc, route, driverID, busID);
  }

  ngOnInit(): void {
    this.ShiftService.connect();
    this.ShiftService.getShiftByDay(this.date);
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
      if(res) {
        this.addShift(res[0],res[1],res[2],res[3],res[4],res[5],res[6],res[7],res[8]);
      }
    });
  }

}

@Component({
  selector: 'shift-management-create-new-dialog',
  templateUrl: './shift-management-create-new-dialog.html',
})
export class ShiftManagementCreateNewDialog implements OnInit {
  constructor(private ShiftService: ShiftService,
    public dialogRef: MdDialogRef<ShiftManagementCreateNewDialog>) {}

    // Named this so they are not confused with the #startTime and #endTime
    // input fields in the template html
    dialogStart = new Date().toISOString();
    dialogEnd = new Date().toISOString();
    getDriversConnection;
    selectedDriver: string;
    drivers = [];

    newStartDate(date) {
      if (date) {
        // Retrieve the HH:MM:00Z portion of the ISO string
        var startTime = this.dialogStart.split("T")[1];
        this.dialogStart = date + "T" + startTime;
        this.ShiftService.getDriversAvailable(this.dialogStart, this.dialogEnd);
      }
    }

    newEndDate(date) {
      if (date) {
        var endTime = this.dialogEnd.split("T")[1];
        this.dialogEnd = date + "T" + endTime;
        this.ShiftService.getDriversAvailable(this.dialogStart, this.dialogEnd);
      }
    }

    newStartTime(time) {
      if (time) {
        var startDate = this.dialogStart.split("T")[0];
        this.dialogStart = startDate + "T" + time + ":00Z";
        this.ShiftService.getDriversAvailable(this.dialogStart, this.dialogEnd);
      }
    }

    newEndTime(time) {
      if (time) {
        var endDate = this.dialogEnd.split("T")[0];
        this.dialogEnd = endDate + "T" + time + ":00Z";
        this.ShiftService.getDriversAvailable(this.dialogStart, this.dialogEnd);
      }
    }

    ngOnInit() {
      this.ShiftService.getDriversAvailable(this.dialogStart, this.dialogEnd);
      this.getDriversConnection = this.ShiftService.getDrivers()
        .subscribe(array => {
          this.drivers = [];
          for (let i in array) {
            this.drivers.push(array[i]);
          }
        })
    }
}
