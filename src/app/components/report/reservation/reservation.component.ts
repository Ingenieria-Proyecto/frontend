import { Component, OnInit } from '@angular/core';
import { ChartDataset, ChartOptions } from 'chart.js';

import { Reservation } from 'src/app/interfaces/reservation';
import { Park } from 'src/app/interfaces/park';
import { ReservationService } from 'src/app/services/reservation.service';
import { ParkService } from 'src/app/services/park.service';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})
export class ReservationComponent implements OnInit {
  public barChartOptions: ChartOptions = {
    responsive: true,
  };
  public barChartLabels: string[] = [];
  public barChartType: string = 'bar';
  public barChartLegend: boolean = true;
  public barChartData: ChartDataset[] = [{ data: [], label: 'Reservaciones' }];
  public list: Reservation[] = [];
  public parks: Park[] = [];
  public loading: boolean = false;
  searchText!: string;
  constructor(
    private reservationService: ReservationService,
    private parkService: ParkService
  ) {}

  ngOnInit() {
    this.fetchReservationData();
    this.fetchParkData();
    this.updateChart();
  }

  fetchReservationData() {
    this.reservationService.getList().subscribe((data: Reservation[]) => {
      this.list = data;

      this.list.forEach((reservation: Reservation) => {
        const date = new Date(reservation.fecha_reservacion);
      const year = date.getFullYear();
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const day = date.getDate().toString().padStart(2, '0');
      reservation.fecha_reservacion = `${year}-${month}-${day}`;
      });

      this.updateChart();
    });
  }

  fetchParkData() {
    this.loading = true;
    this.parkService.getListParks().subscribe((data: Park[]) => {
      this.parks = data;
      this.updateChart();
    });
  }

  updateChart(fecha?: string) {
    console.log(fecha)
    console.log(this.list)
    if (this.list.length > 0 && this.parks.length > 0) {
      console.log("HO LA")
      this.barChartLabels = [];
      this.barChartData[0].data = [];

      this.parks.forEach((park: Park) => {
        park.num_reservation = 0;
        const visitas = this.list.find((r: Reservation) => {
          if (fecha) {
            console.log("Guenas")
            return r.id_parque === park.id && r.fecha_reservacion === fecha;
          } else{
            console.log("No esta pasando nada")
          return r.id_parque === park.id;
          }
        })?.cantidad_campos;
         park.num_reservation = (park.num_reservation ?? 0) + (visitas ?? 0);

        if (park.num_reservation !== 0) {
          this.barChartLabels.push(park.nombre);
          this.barChartData[0].data.push(park.num_reservation);
        }
      });
    }
  }


  filter(){
    this.updateChart(this.searchText)
    console.log(this.barChartLabels)

  }
}
