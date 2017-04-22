export class Shift {
  id: string;
  type: string;
  defects: string;

  constructor(id: string, type: string, defects: string) {
      this.id = id;
      this.type = type;
      this.defects = defects;
    }

  updateData(id: string, type: string, defects: string) {
      this.id = id;
      this.type = type;
      this.defects = defects;
  }


}
