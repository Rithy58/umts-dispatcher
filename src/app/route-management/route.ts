export class Route {
  id: number;
  number: number;
  validBusType: string;

  constructor(number: number, validBusType: string) {
      this.number = number;
      this.validBusType = validBusType;
      }

  updateData(number: number, validBusType: string) {
      this.number = number;
      this.validBusType = validBusType;
  }
  


}
