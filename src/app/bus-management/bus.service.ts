import { Bus } from './bus';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';


@Injectable()
export class BusService {
  private socket;

  connect() {
    this.socket = io();
  }

  getTheBuses() {
    this.socket.emit('getAllBuses');
  }

  // This will always load the buses that have been requested.
  // For this data to be updated, a message needs to be sent to the socket
  getAllBuses() {
    let observable = new Observable(observer => {
      this.socket.on('update buses', (data) => {
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      };
    })
    return observable;
  }
}
