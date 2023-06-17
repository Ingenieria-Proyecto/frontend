import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { ControlReservation } from 'src/app/interfaces/controlReservation';
import { Reservation } from 'src/app/interfaces/reservation';
import { ErrorService } from 'src/app/services/error.service';
import { ReservationService } from 'src/app/services/reservation.service';
import { ReservationModalComponent } from '../reservation-modal/reservation-modal.component';
import { ParkService } from 'src/app/services/park.service';
import { Park } from 'src/app/interfaces/park';

@Component({
  selector: 'app-control-reservation',
  templateUrl: './control-reservation.component.html',
  styleUrls: ['./control-reservation.component.css']
})

export class ControlReservationComponent implements OnInit {

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  listControl: ControlReservation[] = []
  modalRef?: BsModalRef;
  parks: Park[]= [];
  constructor(private _reservationService: ReservationService, private toastr: ToastrService, 
    private _errorService: ErrorService, private modalService: BsModalService, private _parkService: ParkService){

  }
  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      searching: true,
      lengthChange: true,
      language:{
        searchPlaceholder: 'Por nombres',
        url: 'https://cdn.datatables.net/plug-ins/1.10.25/i18n/Spanish.json'
      }
    }
    this.getControls()
    this.getListParks()
  }

  getListParks() {
    this._parkService.getListParks().subscribe((data: Park[]) => {
      this.parks = data;
      this.dtTrigger.next(null);
    });
  }

  getControls(){
    this._reservationService.getControlReservation().subscribe({
      next:(data)=>{
        console.log("Listado de control", data);
        this.listControl = data
      },
      error:(err: HttpErrorResponse)=>{
        this._errorService.msjError(err)
      }
    })
  }

  getReservation(id: number){
    this._reservationService.getReservationId(1).subscribe({
      next:(data)=>{
        console.log("Listado de control", data);
      },
      error:(err: HttpErrorResponse)=>{
        this._errorService.msjError(err)
      }
    })
  }

  openModal(id: number) {
    this._reservationService.getReservationId(id).subscribe({
      next:(data: any)=>{
        console.log("reserva: ", data[0]);
        const initialState = {
          reservation: data[0]
        };
        const park = this.parks.find((p: Park) => p.id === data[0].id_parque);
        console.log('parque: ',park)
        initialState.reservation.nombre_parque = park?.nombre

        this.modalRef = this.modalService.show(ReservationModalComponent, { initialState });
      },
      error:(err: HttpErrorResponse)=>{
        this._errorService.msjError(err)
      }
    })
    //this.modalRef = this.modalService.show(ReservationModalComponent, { initialState });
  }

}
