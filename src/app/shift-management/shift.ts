export class Shift {
  id: number;
  startDate: string;
  startTime: string;
  endDate: string;
  endTime: string;
  startLocation: string;
  endLocation: string;
  route: number;
  driverID: number;
  driverName: string;
  busID: string;

  constructor(id: number, startTime: string, endTime: string,
    startLocation: string, endLocation: string,
    route: number, driverID: number, driverName: string, busID: string) {
      this.id = id;
      this.startDate = startTime.split(" ")[0];
      this.startTime = startTime.split(" ")[1].slice(0,-3);
      this.endDate = endTime.split(" ")[0];
      this.endTime = endTime.split(" ")[1].slice(0,-3);
      this.startLocation = startLocation;
      this.endLocation = endLocation;
      this.route = route;
      this.driverID = driverID;
      this.driverName = driverName;
      this.busID = busID;
    }

  updateData(startTime: string, endTime: string, startLocation: string,
    endLocation: string, route: number, driverID: number,
    driverName:string, busID: string) {
      this.startDate = startTime.split(" ")[0];
      this.startTime = startTime.split(" ")[1].slice(0,-3);
      this.endDate = endTime.split(" ")[0];
      this.endTime = endTime.split(" ")[1].slice(0,-3);
      this.startLocation = startLocation;
      this.endLocation = endLocation;
      this.route = route;
      this.driverID = driverID;
      this.driverName = driverName;
      this.busID = busID;
  }


}
