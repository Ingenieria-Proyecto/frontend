import { Component, Input } from '@angular/core';
import { Reservation } from 'src/app/interfaces/reservation';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-reservation-modal',
  templateUrl: './reservation-modal.component.html',
  styleUrls: ['./reservation-modal.component.css']
})
export class ReservationModalComponent {
  @Input() reservation: Reservation | undefined;

  constructor(public modalRef: BsModalRef) {}

  closeModal() {
    this.modalRef.hide();
  }
}
