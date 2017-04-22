import { Route } from './route';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';


@Injectable()
export class RouteService {
  private url = "http://localhost:8080";
  private socket = io(this.url);


  // This will always load the routes that have been requested.
  // For this data to be updated, a message needs to be sent to the socket
  getAllRoutes() {
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
