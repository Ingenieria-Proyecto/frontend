import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Reservation } from '../interfaces/reservation';

@Injectable({
  providedIn: 'root'
})
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
  }
}
