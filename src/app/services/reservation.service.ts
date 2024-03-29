import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Reservation } from '../interfaces/reservation';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ControlReservation } from '../interfaces/controlReservation';
import { ReportNational } from '../interfaces/reportNational';

@Injectable({
  providedIn: 'root'
})

export class ReservationService {

  private myAppUrl: string
  private reservationUrl: string

  constructor(private http: HttpClient) {
    this.myAppUrl = environment.endpoint
    this.reservationUrl = "api/reservation/"
  }

  saveReservation(reserva: Reservation): Observable<void>{
    return this.http.post<void>(`${this.myAppUrl}${this.reservationUrl}`,reserva)
  }

  getControlReservation(): Observable<ControlReservation []>{
    return this.http.get<ControlReservation[]>(`${this.myAppUrl}api/controlReservation/`)
  }

  getReportNational(): Observable<ReportNational []>{
    return this.http.get<ReportNational[]>(`${this.myAppUrl}api/controlReservation/reportNational`)
  }

  getReservationId(id:number): Observable<Reservation>{
    return this.http.get<Reservation>(`${this.myAppUrl}${this.reservationUrl}/${id}`)
  }

  getFieldsEMpty(date: any): Observable<void>{
    return this.http.post<void>(`${this.myAppUrl}${this.reservationUrl}empty`,date)
  }
  getList(): Observable<Reservation[]> {

    return this.http.get<Reservation[]>(`${this.myAppUrl}${this.reservationUrl}`)
  }

  deleteReservation(id: number, nombre:string): Observable<void>{
    const nameClient = {nombre_Admin: nombre}
    return this.http.delete<void>(`${this.myAppUrl}${this.reservationUrl}${id}`, { body: nameClient })
  }  
}
