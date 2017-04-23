import { Driver } from './driver';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';


@Injectable()
export class DriverService {
  private url = "http://localhost:8080";
  private socket = io(this.url);

  getAllDrivers(){
    this.socket.emit('getShifts');
  }

  // This will always load the drivers that have been requested.
  // For this data to be updated, a message needs to be sent to the socket
  getDrivers() {
    let observable = new Observable(observer => {
      this.socket.on('update drivers', (data) => {
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      };
    })
    return observable;
  }
}
