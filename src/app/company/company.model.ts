import { Work } from '../work/work.model';

export class Company {
  constructor(
    public id: number,
    public name: string,
    public address: string,
    public businessHours: string, // as: DAY_OF_WEEK:HHMM-HHMM,DAY_OF_WEEK:HHMM-HHMM
    public works: Work[]
  ) {}
}
