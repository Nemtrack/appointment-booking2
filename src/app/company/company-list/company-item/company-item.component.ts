import { Component, Input, OnInit } from '@angular/core';
import { Company } from '../../company.model';
import { Work } from 'src/app/work/work.model';
import { WorkService } from 'src/app/work/work.service';

@Component({
  selector: 'app-company-item',
  templateUrl: './company-item.component.html',
  styleUrls: ['./company-item.component.css'],
})
export class CompanyItemComponent implements OnInit {
  companyWorks: any;

  constructor(private workSrvc: WorkService) {}
  ngOnInit(): void {
    this.companyWorks = this.workSrvc
      .getWorksByCompanyId(this.index)
      .map((work) => work.name)
      .join(', ');
  }

  @Input() company: Company = new Company(0, '', '', '', []);
  @Input() index: number = 0;
}
