import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Work } from '../work.model';
import { WorkService } from '../work.service';
import { timeInterval } from 'rxjs';
import { CompanyService } from 'src/app/company/company.service';

@Component({
  selector: 'app-work-edit',
  templateUrl: './work-edit.component.html',
  styleUrls: ['./work-edit.component.css'],
})
export class WorkEditComponent implements OnInit {
  @Input() isAddMode = true;
  @Input() workId = 0;
  @Input() workName = '';
  @Input() workDesc = '';
  @Input() workDuration = 0;
  idOfCurrentCompany = this.companySrvc.getRetrievableCompanyId();

  constructor(
    private route: ActivatedRoute,
    private workSrvc: WorkService,
    private companySrvc: CompanyService,
    private router: Router
  ) {}
  ngOnInit(): void {}

  onAddWork(form: NgForm) {
    const value = form.value;
    if (this.isAddMode) {
      const newWork = new Work(
        0,
        value.workName,
        value.workDesc,
        value.workDuration,
        this.idOfCurrentCompany
      );
      this.workSrvc.addWork(newWork);
    } else {
      const updatedWork: Work = new Work(
        this.workId,
        value.workName,
        value.workDesc,
        value.workDuration,
        this.idOfCurrentCompany
      );
      if (
        !this.workSrvc
          .getWorksByCompanyId(this.idOfCurrentCompany)
          .some(
            (work) =>
              work.name === updatedWork.name &&
              work.description === updatedWork.description &&
              work.duration === updatedWork.duration
          )
      ) {
        this.workSrvc.updateWork(updatedWork, this.workId);
      }
    }
    this.router.navigate(['/companies']);
  }
}
