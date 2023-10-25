import { Work } from "../work/work.model";

export class Reservation {
  constructor(
    public id: number,
    public name: string,
    public phone: string,
    public email: string,
    public date: Date,
    public duration: number,
    public works: Work[]
  ) {}
}
