import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';


import { ParkService } from 'src/app/services/park.service';
import { Park } from 'src/app/interfaces/park';

@Component({
  selector: 'app-list-park',
  templateUrl: './list-park.component.html',
  styleUrls: ['./list-park.component.css']
})
export class ListParkComponent implements OnInit {
  parks: Park[] = []; // Lista completa de parques
  pageSize = 12; // Cantidad de parques por página
  currentPage = 1; // Página actual
  totalPages: number = 0; // Número total de páginas
  paginatedParks: Park[] = []; // Parques a mostrar en la página actual
  loading = false;
  searchText!: string;


  constructor(
    private _parkService: ParkService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getListParks();

  }

  getListParks() {
    this.loading = true;
    this._parkService.getListParks().subscribe(
      (data: Park[]) => {
        this.parks = data;
        this.totalPages = Math.ceil(this.parks.length / this.pageSize);
        this.updatePaginatedParks();
        this.loading = false;
      },
      (error) => {
        this.toastr.error('Error al obtener la lista de parques.');
        this.loading = false;
      }
    );
  }

  updatePaginatedParks() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedParks = this.parks.slice(startIndex, endIndex);
  }

  filter() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;

    this.paginatedParks = this.parks
      .filter(park => park.nombre.toLowerCase().includes(this.searchText.toLowerCase()))
      .slice(startIndex, endIndex);
  }

  setCurrentPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.updatePaginatedParks();
    }
  }

  getPageArray(): number[] {
    return Array.from({ length: this.totalPages }, (_, index) => index + 1);
  }
}
