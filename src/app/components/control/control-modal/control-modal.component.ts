import { Component, Input } from '@angular/core';
import { Park } from 'src/app/interfaces/park';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-control-modal',
  templateUrl: './control-modal.component.html',
  styleUrls: ['./control-modal.component.css']
})
export class ControlModalComponent {
  @Input() park: Park | undefined;

  constructor(public modalRef: BsModalRef) {}

  closeModal() {
    this.modalRef.hide();
  }
}
