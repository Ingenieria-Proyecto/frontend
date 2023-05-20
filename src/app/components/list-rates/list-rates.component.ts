import { Component, OnInit } from '@angular/core';
import { Rate } from 'src/app/interfaces/rate';
import { RatesService } from 'src/app/services/rates.service';
import { ToastrService } from 'ngx-toastr';
import { ErrorService } from 'src/app/services/error.service';
import { HttpErrorResponse } from '@angular/common/http';
import {Subject} from 'rxjs';


@Component({
  selector: 'app-list-rates',
  templateUrl: './list-rates.component.html',
  styleUrls: ['./list-rates.component.css']
})
export class ListRatesComponent implements OnInit{
  
  listRates: Rate[] = []
  loading: boolean = false
  email: string = localStorage.getItem("user") || ""
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  type_user: string = localStorage.getItem("type_user") || ""
  
  constructor(private _ratesService: RatesService,private _serviceError: ErrorService ,private toastr: ToastrService) { 
    
  }
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
    this.getListRates()
  }

  getListRates(){
    this.loading = true
    this._ratesService.getListRates().subscribe((data: Rate[]) => {
      console.log(data)
      this.listRates = data
      this.loading = false
      this.dtTrigger.next(null)
    })
  }


  deleteRate(id: number){
    this.loading = true
    this._ratesService.deleteRate(id).subscribe({
      next: (data: any) => {
        console.log(data.msg)
        this.toastr.warning(data.msg, 'Tarifa elimanada')
        this.getListRates()
      },
      error: (e: HttpErrorResponse) => {
        this.loading = false
        this._serviceError.msjError(e)
      }
    })
  }

}
