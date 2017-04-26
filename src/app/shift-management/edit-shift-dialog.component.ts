import { Component, OnInit, Inject } from '@angular/core';
import { MdDialog, MdDialogRef, MD_DIALOG_DATA } from '@angular/material';

import { Shift } from './shift';
import { ShiftService } from './shift.service';


@Component({
  selector: 'edit-shift-dialog',
  templateUrl: './edit-shift-dialog.component.html',
})
export class EditShiftDialog implements OnInit {
  constructor(@Inject(MD_DIALOG_DATA) private shift: any,
    private ShiftService: ShiftService,
    public dialogRef: MdDialogRef<EditShiftDialog>) {}

    // Named this so they are not confused with the #startTime and #endTime
    // input fields in the template html
    getDriversConnection;
    selectedDriver: string;
    drivers = [];

    // Data for driver select dropdown is binded to the ID
    // so we need to refetch the name from the list when
    // there is a change.
    updateDriverName(driverID) {
      let driverName = "";
      this.drivers.forEach(function(driver) {
        if(driver.id == driverID) {
          driverName = driver.name;
        }
      });
      this.shift.driver[1] = driverName;
    }

    newStartDate() {
      let start = this.shift.startDate + "T" + this.shift.startTime;
      let end = this.shift.endDate + "T" + this.shift.endTime;
      this.ShiftService.getDriversAvailable(start, end);
    }

    newEndDate(date) {
      let start = this.shift.startDate + "T" + this.shift.startTime;
      let end = this.shift.endDate + "T" + this.shift.endTime;
      this.ShiftService.getDriversAvailable(start, end);
    }

    newStartTime(time) {
      let start = this.shift.startDate + "T" + this.shift.startTime;
      let end = this.shift.endDate + "T" + this.shift.endTime;
      this.ShiftService.getDriversAvailable(start, end);
    }

    newEndTime(time) {
      let start = this.shift.startDate + "T" + this.shift.startTime;
      let end = this.shift.endDate + "T" + this.shift.endTime;
      this.ShiftService.getDriversAvailable(start, end);
    }

    ngOnInit() {
      let start = this.shift.startDate + "T" + this.shift.startTime;
      let end = this.shift.endDate + "T" + this.shift.endTime;
      this.ShiftService.getDriversAvailable(start, end);
      this.getDriversConnection = this.ShiftService.getDrivers()
        .subscribe(array => {
          this.drivers = [];
          for (let i in array) {
            this.drivers.push(array[i]);
          }
        })
    }
}
