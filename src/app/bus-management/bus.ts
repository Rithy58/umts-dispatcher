export class Bus {
  id: string;
  type: string;
  defects: string;

  constructor(id: string, type: string, defects: string) {
      this.id = id;
      this.type = type;
      this.defects = defects;
    }

  updateData(type: string, defects: string) {
      this.type = type;
      this.defects = defects;
  }


}
