import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Reservation } from '../reservation.model';
import { ReservationService } from '../reservation.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Calendar } from 'primeng/calendar';
import { AuthService } from 'src/app/auth.service';
import { Work } from 'src/app/work/work.model';

@Component({
  selector: 'app-reservation-screen',
  templateUrl: './reservation-screen.component.html',
  styleUrls: ['./reservation-screen.component.css'],
})
export class ReservationScreenComponent implements OnInit {

  constructor(
    private resSrvc: ReservationService,
    private route: ActivatedRoute,
    private router: Router,
    private authSrvc: AuthService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.currentCompanyId = params['compId'];
    });
    this.date.setDate(new Date().getDate() + 1);
    this.date.setHours(12, 0, 0, 0);
    // if(this.resSrvc.getReservables().length > 0){
    //   this.authSrvc.switchReserveModeOn();
    // }
  }

  @ViewChild('calendar') calendar: Calendar | undefined;
  newReservation:Reservation=new Reservation(0, '', '', '', new Date(), 0, []);
  resName: string | undefined;
  resPhone: string | undefined;
  resEmail: string | undefined;
  minDate = new Date();
  date = new Date();
  currentCompanyId = 0;
  showPopup = false;
  reservableWorks = this.resSrvc.getReservables();
  reservableArrayLength = this.reservableWorks.length;
  reservableDuration = this.resSrvc.getReservableDuration();

  onAddReservation(form: NgForm) {
    const value = form.value;
    this.newReservation = new Reservation(
      this.resSrvc.getHighestReservationId(),
      value.resName,
      value.resPhone,
      value.resEmail,
      this.date,
      this.resSrvc.sumWorkDurations(),
      this.resSrvc.getReservables()
    );
    this.resSrvc.addReservation(this.newReservation);
    console.log(this.newReservation);
    this.showPopup = true;
  }

  closePopup(isPopupClosed: boolean){
    this.showPopup = isPopupClosed;
    this.router.navigate(['/work', this.currentCompanyId]);
  }
}
