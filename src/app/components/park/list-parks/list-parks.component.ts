import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import {Subject} from 'rxjs';
import Swal from 'sweetalert2';

import { ParkService } from 'src/app/services/park.service';
import { Park } from 'src/app/interfaces/park';

@Component({
  selector: 'app-list-parks',
  templateUrl: './list-parks.component.html',
  styleUrls: ['./list-parks.component.css'],
})
export class ListParksComponent implements OnInit {
  listPark: Park[] = [];
  loading: boolean = false;
  email: string = localStorage.getItem("user") || ""
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

  constructor(
    private _parkService: ParkService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
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
    this._parkService.getListParks().subscribe((data: Park[]) => {
      this.listPark = data;
      this.loading = false;
      this.dtTrigger.next(null);
    });
  }

  deletePark(id: number) {
    this.loading = true;
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción eliminará el parque',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this._parkService.deleteProduct(id).subscribe(() => {
          this.getListParks();
          this.toastr.warning('El parque fue eliminado con éxito', 'Parque eliminado');
        });
      }
    });
  }

}

