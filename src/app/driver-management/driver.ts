export class Driver {
  id: number;
  name: string;
  phoneNumber: string;
  numLateShifts: number;

  constructor(id: number, name: string, 
    phoneNumber: string, numLateShifts: number) {
      this.id = id;
      this.name = name;
      this.phoneNumber = phoneNumber;
      this.numLateShifts = numLateShifts;
    }

  updateData(name: string, phoneNumber: string, numLateShifts: number) {
      this.name = name;
      this.phoneNumber = phoneNumber;
      this.numLateShifts = numLateShifts;
  }


}
