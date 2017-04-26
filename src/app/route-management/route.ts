export class Route {
  routeID: number;
  validBusTypes: string;

  constructor(routeID: number, validBusTypes: string) {
      this.routeID = routeID;
      this.validBusTypes = validBusTypes;
      }

  updateData(routeID: number, validBusTypes: string) {
      this.routeID = routeID;
      this.validBusTypes = validBusTypes;
  }

}
