import { Component, OnInit, TemplateRef } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import {Subject} from 'rxjs';
import Swal from 'sweetalert2';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

import { ReservationService } from 'src/app/services/reservation.service';
import { Reservation } from 'src/app/interfaces/reservation'
import { ParkService } from 'src/app/services/park.service';
import { Park } from 'src/app/interfaces/park';
import { ReservationModalComponent } from '../reservation-modal/reservation-modal.component';

@Component({
  selector: 'app-administrative-list',
  templateUrl: './administrative-list.component.html',
  styleUrls: ['./administrative-list.component.css']
})
export class AdministrativeListComponent implements OnInit{

  list: Reservation[] = [];
  parks: Park[]= [];
  loading: boolean = false;
  email: string = localStorage.getItem("user") || ""
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  modalRef?: BsModalRef;


  constructor(
    private _reservationService: ReservationService, private _parkService: ParkService,
    private toastr: ToastrService, private modalService: BsModalService
  ) {}

  ngOnInit(): void {
    console.log(localStorage.getItem('user'));
    this.dtOptions = {
      pagingType: 'full_numbers',
      searching: true,
      lengthChange: true,
      language:{
        searchPlaceholder: 'Por nombres',
        url: 'https://cdn.datatables.net/plug-ins/1.10.25/i18n/Spanish.json'
      }
    }
    this.getListParks();
    this.getListReservation();
    console.log(this.list)
  }

  getListParks() {
    this.loading = true;
    this._parkService.getListParks().subscribe((data: Park[]) => {
      this.parks = data;
      this.loading = false;
      this.dtTrigger.next(null);
    });
  }

  getListReservation() {
    this.loading = true;
    this._reservationService.getList().subscribe((data: Reservation[]) => {
      this.list = data;

      // Obtener el nombre del parque para cada reservación
      this.list.forEach((reservation: Reservation) => {
        const park = this.parks.find((p: Park) => p.id === reservation.id_parque);
        reservation.nombre_parque = park ? park.nombre : 'Nombre no encontrado';

        const fechaReservacion = new Date(reservation.fecha_reservacion);
        reservation.fecha_reservacion = fechaReservacion.toLocaleDateString();
      });

      this.loading = false;
      this.dtTrigger.next(null);
    });
  }

  deleteReservation(id: number) {
    this.loading = true;
    Swal.fire({
      title: '¿Estás seguro de eliminar esta reservación?',
      text: 'Esta acción eliminará la reservación',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this._reservationService.deleteReservation(id, ""+localStorage.getItem('user')).subscribe(() => {
          this.getListParks();
          this.toastr.warning('La reservación fue eliminada con exito', 'Reservación eliminada');
        });
      }
    });
  }


  openModal(reservation: Reservation) {
    const initialState = {
      reservation: reservation
    };
    this.modalRef = this.modalService.show(ReservationModalComponent, { initialState });
  }

}
