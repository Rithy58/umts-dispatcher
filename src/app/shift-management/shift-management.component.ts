import { Component, OnInit } from '@angular/core';
import {MdDialog, MdDialogRef} from '@angular/material';

import { Shift } from './shift';
import { ShiftService } from './shift.service';
import { CreateShiftDialog } from './create-shift-dialog.component';
import { EditShiftDialog } from './edit-shift-dialog.component';


@Component({
  selector: 'shift-management',
  templateUrl: './shift-management.component.html',
  styleUrls: [ './shift-management.component.css' ]
})
export class ShiftManagementComponent implements OnInit {

  // Clients local Shift[] array for displaying
  shifts: Shift[] = [];
  date = new Date().toISOString();

  // Listener for all shifts
  getShiftsConnection;

  selectedOption: string;

  constructor(private ShiftService: ShiftService, public dialog: MdDialog) { }

  changeDate(newDate) {
    this.date = newDate + "T12:00:00.000Z";
    this.shifts = [];
    this.ShiftService.getShiftByDay(this.date);
  }

  addShift(startDate, startTime, endDate, endTime,
    startLoc, endLoc, route, driverID, busID): void {
      let startD = startDate + "T" + startTime + ":00Z";
      let endD = endDate + "T" + endTime + ":00Z";
      this.ShiftService.addShift(startD, endD, startLoc, endLoc, route, driverID, busID);
      this.ShiftService.getShiftByDay(this.date);
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
                shift.route, shift.driver_id, shift.driver_name, shift.bus_id);
            }
          });
          var currDateStr = new Date(shift.start_time).toLocaleDateString();
          var shiftDateStr = new Date(this.date).toLocaleDateString();

          // Insert if we didnt find it and its for the proper Date.
          if (inShiftArr === false && currDateStr === shiftDateStr) {

              this.shifts.push(new Shift(shift.id, shift.start_time,
                shift.end_time, shift.start_location, shift.end_location,
                shift.route, shift.driver_id, shift.driver_name, shift.bus_id));

          }
        }
      })
  }

  ngOnDestroy() {
    this.getShiftsConnection.unsubscribe();
  }

  openCreateNewDialog() {
    let dialogRef = this.dialog.open(CreateShiftDialog);
    dialogRef.afterClosed().subscribe(res => {
      if(res) {
        this.addShift(res[0],res[1],res[2],res[3],res[4],res[5],res[6],res[7],res[8]);
      }
    });
  }

  openEditDialog(shift) {
    let dialogRef = this.dialog.open(EditShiftDialog, {
      data: shift
    });
    dialogRef.afterClosed().subscribe(res => {
      console.log(shift);
      this.ShiftService.editShift(shift);
    });
  }

}
