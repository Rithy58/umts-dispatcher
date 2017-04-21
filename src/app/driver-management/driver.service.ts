import { Shift } from './shift';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';


@Injectable()
export class ShiftService {
  private url = "http://localhost:8080";
  private socket = io(this.url);

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
