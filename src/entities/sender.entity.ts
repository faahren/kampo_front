export class Sender {
  id: number;
  email: string;
  signature: string;
  date_created: Date;
  constructor(id: number, title: string, date_created: Date, signature: string) {
    this.id = id;
    this.email = title;
    this.signature = signature
    this.date_created = date_created;
  }
}