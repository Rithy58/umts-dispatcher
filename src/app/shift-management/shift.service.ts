import { Shift } from './shift';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';


@Injectable()
export class ShiftService {
  private url = "http://localhost:8080";
  private socket;

  connect() {
    this.socket = io(this.url);
  }

  addShift(startTime, endTime, startLoc, endLoc, route, driverID, busID): void {
    this.socket.emit('addShift', {
      startTime: startTime,
      endTime: endTime,
      startLoc: startLoc,
      endLoc: endLoc,
      route: route,
      driverID: driverID,
      busID: busID
    });
  }

  getShiftByDay(date) {
    this.socket.emit('getShiftByDay', date);
  }

  // This will always load the shifts that have been requested.
  // For this data to be updated, a message needs to be sent to the socket
  getShifts() {
    let observable = new Observable(observer => {
      this.socket.on('update shifts', (data) => {
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      };
    })
    return observable;
  }
}
