import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
<<<<<<< HEAD
import { environment } from 'src/environments/environment';
import { Reservation } from '../interfaces/reservation';
import { Observable } from 'rxjs';
=======
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Reservation } from '../interfaces/reservation';
>>>>>>> 73060f881fc9c7f94df30d71be5f3dc45c0b5a26

@Injectable({
  providedIn: 'root'
})
<<<<<<< HEAD
export class ReservationService {

  private myAppUrl: string
  private myApiUrl: string

  constructor(private http: HttpClient) {
    this.myAppUrl = environment.endpoint
    this.myApiUrl = "api/reservation/"
  }

  saveReservation(reserva: Reservation): Observable<void>{
    return this.http.post<void>(`${this.myAppUrl}${this.myApiUrl}`,reserva)
  }

  getFieldsEMpty(date: any): Observable<void>{
    return this.http.post<void>(`${this.myAppUrl}${this.myApiUrl}empty`,date)
=======
export class ReservacionService {

  private myAppUrl: string
  private reservationUrl: string

  constructor(private http: HttpClient) {
    this.myAppUrl = environment.endpoint
    this.reservationUrl = 'api/reservation/'
  }

  getList(): Observable<Reservation[]> {

    return this.http.get<Reservation[]>(`${this.myAppUrl}${this.reservationUrl}`)
  }

  deleteReservation(id: number, nombre:string): Observable<void>{
    const nameClient = {nombre_Admin: nombre}
    return this.http.delete<void>(`${this.myAppUrl}${this.reservationUrl}${id}`, { body: nameClient })
>>>>>>> 73060f881fc9c7f94df30d71be5f3dc45c0b5a26
  }
}
