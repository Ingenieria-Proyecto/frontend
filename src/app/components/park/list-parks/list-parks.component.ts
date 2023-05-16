import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

import { ParkService } from 'src/app/services/park.service';
import { Park } from 'src/app/interfaces/park';

@Component({
  selector: 'app-list-parks',
  templateUrl: './list-parks.component.html',
  styleUrls: ['./list-parks.component.css'],
})
export class ListParksComponent implements OnInit {
  listPark: Park[] = [];
  filteredListPark: Park[] = []; // Nueva lista filtrada
  loading: boolean = false;

  constructor(
    private _parkService: ParkService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getListParks();
  }

  getListParks() {
    this.loading = true;
    this._parkService.getListParks().subscribe((data: Park[]) => {
      this.listPark = data;
      this.filteredListPark = data; // Inicialmente, mostrar todos los parques
      this.loading = false;
    });
  }

  deletePark(id: number){
    this.loading = true
    this._parkService.deleteProduct(id).subscribe(() => {
    this.getListParks()
    this.toastr.warning('El parque fue eliminado con exito', 'Parque eliminado')
    })
  }

  filterParks() {
    // Filtrar la lista de parques basado en el filtro
    if (this.filtro.trim() !== '') {
      this.filteredListPark = this.listPark.filter(park =>
        park.nombre_parque.toLowerCase().includes(this.filtro.trim().toLowerCase())
      );
    } else {
      this.filteredListPark = this.listPark; // Si no hay filtro, mostrar todos los parques
    }
  }

  filtro: string = '';
}
