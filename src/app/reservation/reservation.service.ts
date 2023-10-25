import { Injectable } from '@angular/core';
import { Work } from '../work/work.model';
import { Reservation } from './reservation.model';

@Injectable({
  providedIn: 'root',
})
export class ReservationService {
  private reservations: Reservation[] = [];
  private toReservableWorks: Work[] = [];

  addToReservableArray(work: Work) {
    this.toReservableWorks.push(work);
  }

  emptyReservables() {
    this.toReservableWorks.splice(0, this.toReservableWorks.length);
  }

  addReservation(reservation: Reservation) {
    this.reservations.push(reservation);
    this.emptyReservables();
  }

  getReservables() {
    return this.toReservableWorks.slice();
  }

  sumWorkDurations() {
    return this.toReservableWorks.reduce(
      (totalDuration, work) => totalDuration + work.duration,
      0
    );
  }

  getHighestReservationId() {
    return this.reservations.length;
  }

  getReservations() {
    return this.reservations.slice();
  }

  getReservableDuration() {
    let sumOfDuration = 0;
    if (sumOfDuration != undefined) {
      for (let i = 0; i < this.toReservableWorks.length; i++) {
        sumOfDuration += this.toReservableWorks[i].duration;
      }
    }
    return sumOfDuration;
  }
}
