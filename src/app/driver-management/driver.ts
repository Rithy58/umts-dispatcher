export class Shift {
  id: number;
  startTime: Date;
  endTime: Date;
  startLocation: string;
  endLocation: string;
  route: number;
  driverID: number;
  busID: string;

  constructor(id: number, startTime: Date, endTime: Date,
    startLocation: string, endLocation: string,
    route: number, driverID: number, busID: string) {
      this.id = id;
      this.startTime = startTime;
      this.endTime = endTime;
      this.startLocation = startLocation;
      this.endLocation = endLocation;
      this.route = route;
      this.driverID = driverID;
      this.busID = busID;
    }

  updateData(startTime: Date, endTime: Date,
    startLocation: string, endLocation: string,
    route: number, driverID: number, busID: string) {
      this.startTime = startTime;
      this.endTime = endTime;
      this.startLocation = startLocation;
      this.endLocation = endLocation;
      this.route = route;
      this.driverID = driverID;
      this.busID = busID;
  }


}
