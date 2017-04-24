import { Driver } from './driver';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';


@Injectable()
export class DriverService {
  private socket;

  connect() {
    this.socket = io();
  }

  addDriver(name: string, phone: string) {
    this.socket.emit('addDriver', {
      name: name,
      phone: phone,
      late_count: 0
    });
  }

  getAllDrivers(){
    this.socket.emit('getAllDrivers');
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
