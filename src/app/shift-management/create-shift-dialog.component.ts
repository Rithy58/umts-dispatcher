import { Component, OnInit } from '@angular/core';
import {MdDialog, MdDialogRef} from '@angular/material';

import { Shift } from './shift';
import { ShiftService } from './shift.service';


@Component({
  selector: 'shift-management-create-new-dialog',
  templateUrl: './shift-management-create-new-dialog.html',
})
export class CreateShiftDialog implements OnInit {
  constructor(private ShiftService: ShiftService,
    public dialogRef: MdDialogRef<CreateShiftDialog>) {}

    // Named this so they are not confused with the #startTime and #endTime
    // input fields in the template html
    dialogStart = new Date().toISOString();
    dialogEnd = new Date().toISOString();
    getDriversConnection;
    selectedDriver: string;
    drivers = [];
    // For preloading the shifts start date/dime data
    defaultStartDate;
    defaultStartTime;
    defaultEndDate;
    defaultEndTime;

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
