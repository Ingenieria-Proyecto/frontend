import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Park } from '../interfaces/park';

@Injectable({
  providedIn: 'root'
})

export class ParkService {

  private myAppUrl: string
  private myApiUrl: string

  constructor(private http: HttpClient) {
    this.myAppUrl = environment.endpoint
    this.myApiUrl = "api/park"
  }

  getListParks(): Observable<Park[]> {
    return this.http.get<Park[]>(`${this.myAppUrl}${this.myApiUrl}`)
  }
  getPark(id: number): Observable<Park>{
    return this.http.get<Park>(`${this.myAppUrl}${this.myApiUrl}`+'/'+id)
  }


  deleteProduct(id: number): Observable<void>{
    return this.http.delete<void>(`${this.myAppUrl}${this.myApiUrl}`+'/'+id)
  }

  addPark(park: Park): Observable<any>{
    return this.http.post(`${this.myAppUrl}${this.myApiUrl}`, park)
  }

  updatePark(park: Park): Observable<any>{
    return this.http.put(`${this.myAppUrl}${this.myApiUrl}`, park)
  }

}
