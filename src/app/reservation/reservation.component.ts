import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Company } from '../company/company.model';
import { CompanyService } from '../company/company.service';
import { Work } from '../work/work.model';
import { WorkService } from '../work/work.service';
import { ReservationService } from './reservation.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css'],
})
export class ReservationComponent implements OnInit {
  editMode = false;
  company = new Company(0, '', '', '', []);
  work = new Work(0, '', '', 0, 0);
  isCanAddWorkToReservations = true;
  interval: any;
  countDown = 3;
  isWorkInReservables = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private companySrvc: CompanyService,
    private workSrvc: WorkService,
    private resSrvc: ReservationService,
    private authSrvc: AuthService
  ) {}
  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.company = this.companySrvc.getCompany(+params['compId']);
      this.work = this.company.works[+params['workId']];
      // if (params['workId']){
      //   this.editMode = true;
      // }
      // if(this.resSrvc.getReservables().length > 0){
      //   this.authSrvc.switchReserveModeOn();
      // }
    });
    if (this.resSrvc.getReservables().includes(this.work)){
      this.isWorkInReservables = true;
    }
  }
  deleteWork() {
    this.workSrvc.deleteWork(this.work);
    this.workSrvc.updateIdsForWorksAfterWorkDeletion(this.work);
    this.router.navigate(['/work', this.work.companyId]);
    if (this.workSrvc.getWorksByCompanyId(this.work.id).length < 1) {
      this.router.navigate(['/companies']);
    }
  }
  addToReservation() {
    if (
      !this.resSrvc
        .getReservables()
        .some(
          (work) => work === this.work || work.companyId !== this.work.companyId
        )
    ) {
      this.resSrvc.addToReservableArray(this.work);
      this.router.navigate(['work', this.company.id]);
    } else {
      this.isCanAddWorkToReservations = false;
      let countDown = this.countDown;
      const countdownInterval = setInterval(() => {
        countDown--;
        this.countDown--;
      }, 1000);
      this.interval = setInterval(() => {
        this.router.navigate(['work', this.company.id]);
        clearInterval(this.interval);
        clearInterval(countdownInterval);
      }, this.countDown * 1000);
    }
    console.log(this.resSrvc.getReservables());
  }
}
