import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Reservation } from '../interfaces/reservation';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
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
  }
}
