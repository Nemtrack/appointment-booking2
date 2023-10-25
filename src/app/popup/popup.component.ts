import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Reservation } from '../reservation/reservation.model';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})
export class PopupComponent {
  @Input() message: Reservation = new Reservation(0, '', '', '', new Date(), 0, []);
  @Output() isPopupClosed: EventEmitter<boolean> = new EventEmitter();

  onClosePopup(){
    this.isPopupClosed.emit(true);
  }
}
