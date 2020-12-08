export class Team {
  id: number;
  name: string;
  sync: boolean;
  constructor(id: number, name: string, sync: boolean) {
    this.id = id;
    this.name = name;
    this.sync = sync;
  }
}