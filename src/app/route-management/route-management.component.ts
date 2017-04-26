import { Component, OnInit } from '@angular/core';
import {MdDialog, MdDialogRef} from '@angular/material';
import { Route } from './route';
import { RouteService } from './route.service';


@Component({
  selector: 'route-management',
  templateUrl: './route-management.component.html',
  styleUrls: [ './route-management.component.css' ]
})
export class RouteManagementComponent implements OnInit {

  // Clients local route[] array for displaying
  routes: Route[] = [];

  // Listener for all routes
  getRoutesConnection;




  constructor(private RouteService: RouteService, public dialog: MdDialog) { }



  add(routeID: number, validBusTypes: string): void {
    this.RouteService.addRoute(routeID, validBusTypes);
  }

  deleteRoute(number: number): void {
    this.RouteService.deleteRoute(number);
  }

  ngOnInit(): void {
    this.RouteService.connect();
    this.RouteService.getAllRoutes();
    this.getRoutesConnection = this.RouteService.getRoutes()
      .subscribe(array => {
        for (let i in array) {
          // create a route object in the front end for each route JSON.
          var route = array[i];
          let inRouteArr = false;
          // If this route is already in the array, just update the data.
          this.routes.forEach(function(s) {
            if (s.routeID === route.number) {
              inRouteArr = true;
              s.updateData(route.valid_bus_types);
            }
          });
          // Insert if we didnt find it.
          if (inRouteArr === false) {
            this.routes.push(new Route(route.number, route.valid_bus_types));
          }
        }
      })
  }

  ngOnDestroy() {
    this.getRoutesConnection.unsubscribe();
  }

  openDialog() {
    let dialogRef = this.dialog.open(AddRouteDialog);
    dialogRef.afterClosed().subscribe(res=>{
      this.add(res[0],res[1]);
    });
  }

  deleteDialog(number: number){

    let dialogRef = this.dialog.open(DeleteRouteDialog);
    dialogRef.afterClosed().subscribe(res => {
      if(res == 'yes') {
        this.deleteRoute(number);
        this.routes = [];
        this.ngOnInit();

       }
   });
  }
}

@Component({
  selector: 'add-route-popup',
  templateUrl: './add-route-popup.html'
})
export class AddRouteDialog{
  constructor(public dialogRef: MdDialogRef<AddRouteDialog>){}

  selectedType: string;

  types = [
    {viewValue: 'Single'},
    {viewValue: 'Double'},
    {viewValue: 'Both'}
  ];
}

@Component({
  selector: 'delete-route-popup',
  templateUrl: './delete-route-popup.html',
})
export class DeleteRouteDialog {
  constructor(public dialogRef: MdDialogRef<DeleteRouteDialog>) {}
}
