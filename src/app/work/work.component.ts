import { Component, OnInit } from '@angular/core';
import { CompanyService } from '../company/company.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Company } from '../company/company.model';
import { WorkService } from './work.service';
import { Work } from './work.model';
import { Reservation } from '../reservation/reservation.model';
import { ReservationService } from '../reservation/reservation.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-work',
  templateUrl: './work.component.html',
  styleUrls: ['./work.component.css'],
  providers: [],
})
export class WorkComponent implements OnInit {
  currentCompany: Company = new Company(0, '', '', '', []);
  isAddMode = false;

  constructor(
    private companySrvc: CompanyService,
    private workSrvc: WorkService,
    private route: ActivatedRoute,
    private router: Router,
    private resSrvc: ReservationService,
    private authSrvc: AuthService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.currentCompany = this.companySrvc.getCompany(+params['id']);
      this.currentCompany.works = this.workSrvc.getWorksByCompanyId(
        +params['id']
      );
      this.companySrvc.setRetrievableCompanyId(+params['id']);
    });
    this.workSrvc.worksChanged.subscribe(() => {
      this.currentCompany.works = this.workSrvc.getWorksByCompanyId(
        this.currentCompany.id
      );
    });
    // if(this.resSrvc.getReservables().length > 0){
    //   this.authSrvc.switchReserveModeOn();
    // }
  }

  onNavigateToAdd() {
    this.router.navigate(['add'], { relativeTo: this.route });
    this.isAddMode = !this.isAddMode;
  }
}
