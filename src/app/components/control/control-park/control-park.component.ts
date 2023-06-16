import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import {Subject} from 'rxjs';
import Swal from 'sweetalert2';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ParkService } from 'src/app/services/park.service';
import { Park } from 'src/app/interfaces/park';
import { Control } from 'src/app/interfaces/control';
import { ControlModalComponent } from '../control-modal/control-modal.component';



@Component({
  selector: 'app-control-park',
  templateUrl: './control-park.component.html',
  styleUrls: ['./control-park.component.css']
})
export class ControlParkComponent implements OnInit {
  listPark: Park[] = [];
  listControl: Control[] = [];
  loading: boolean = false;
  email: string = localStorage.getItem("user") || ""
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  modalRef?: BsModalRef;

  constructor(
    private _parkService: ParkService,
    private toastr: ToastrService, private modalService: BsModalService
  ) {}

  ngOnInit(): void {
    console.log(localStorage.getItem('user'));
    this.dtOptions = {
      pagingType: 'full_numbers',
      searching: true,
      lengthChange: true,
      language:{
        searchPlaceholder: 'Por nombres de parques',
        url: 'https://cdn.datatables.net/plug-ins/1.10.25/i18n/Spanish.json'
      }
    }
    this.getListParks();
  }

  getListParks() {
    this.loading = true;

      this._parkService.getParksDelete().subscribe((data: Park[]) => {
      this.listPark = data;
    });

    this._parkService.getControl().subscribe((data: Control[]) => {
      this.listControl = data;

      this.listControl.forEach((control: Control) => {
        const park = this.listPark.find((p: Park) => p.id === control.id_parque);
        control.nombre_parque = park ? park.nombre : 'Nombre no encontrado';

        const fechaReservacion = new Date(control.fecha);
        control.fecha = fechaReservacion.toLocaleDateString();
      });
      this.loading = false;
      this.dtTrigger.next(null);
    });
  }

  getParkById(id: number): Park | undefined{
    return this.listPark.find(park => park.id === id);
  }

  openModal(park?: Park) {
    if (park) {
      const initialState = {
        park: park
      };
      this.modalRef = this.modalService.show(ControlModalComponent, { initialState });
    }
  }
}
