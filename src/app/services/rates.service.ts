import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Rate } from '../interfaces/rate';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RatesService {

  private myAppUrl: string
  private myApiUrl: string

  constructor(private http: HttpClient) {
    this.myAppUrl = environment.endpoint
    this.myApiUrl = "api/rate/"
  }

  getListRates(): Observable<Rate[]> {

    return this.http.get<Rate[]>(`${this.myAppUrl}${this.myApiUrl}`)
  }

  deleteRate(id: number): Observable<string>{
    return this.http.delete<string>(`${this.myAppUrl}${this.myApiUrl}${id}`)
  }

  saveRate(rate: Rate): Observable<void>{
    return this.http.post<void>(`${this.myAppUrl}${this.myApiUrl}`,rate)
  }

  getRate(id: number): Observable<Rate>{
    return this.http.get<Rate>(`${this.myAppUrl}${this.myApiUrl}${id}`)
  }

  updateRate(id: number, rate: Rate): Observable<void>{
    return this.http.put<void>(`${this.myAppUrl}${this.myApiUrl}${id}`, rate)
  }


}
