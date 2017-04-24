import { Route } from './route';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';


@Injectable()
export class RouteService {
  private socket;

  connect() {
    this.socket = io();
  }

  getAllRoutes(){
    this.socket.emit('getAllRoutes');
  }

  // This will always load the routes that have been requested.
  // For this data to be updated, a message needs to be sent to the socket
  getRoutes() {
    let observable = new Observable(observer => {
      this.socket.on('update routes', (data) => {
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      };
    })
    return observable;
  }
}
