import { Component, OnInit } from '@angular/core';
import { ChartDataset, ChartOptions } from 'chart.js';
import { ReportNational } from 'src/app/interfaces/reportNational';
import { ReservationService } from 'src/app/services/reservation.service';

@Component({
  selector: 'app-nacionalidad',
  templateUrl: './nacionalidad.component.html',
  styleUrls: ['./nacionalidad.component.css']
})
export class NacionalidadComponent implements OnInit{
  public barChartOptions: ChartOptions = {
    responsive: true,
  };
  public barChartLabels: string[] = [];
  public barChartType: string = 'bar';
  public barChartLegend: boolean = true;
  public barChartData: ChartDataset[] = [{ data: [], label: 'Nacionalidad' }];
  public list: ReportNational[] = [];
  public loading: boolean = false;

  constructor(
    private reservationService: ReservationService,
  ) {}

  ngOnInit() {
    this.fetchReservationData();
  }

  fetchReservationData() {
    this.reservationService.getReportNational().subscribe((data: ReportNational[]) => {
      console.log('reporte nacional: ',data)
      this.list = data;
      this.updateChart();
    });
  }


  updateChart() {
    if (this.list.length > 0) {
      this.barChartLabels = [];
      this.barChartData[0].data = [];

      this.list.forEach((report: ReportNational) => {

          this.barChartLabels.push(report.nacionalidad);
          this.barChartData[0].data.push(report.cantidad_reservaciones);
        
      });
    }
  }
}
