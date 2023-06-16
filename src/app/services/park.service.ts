import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Park } from '../interfaces/park';
import { Control } from '../interfaces/control';

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
  getParksDelete(): Observable<Park[]>{
    return this.http.get<Park[]>(`${this.myAppUrl}${this.myApiUrl}`+'/delete')
  }
  getControl(): Observable<Control[]>{
    return this.http.get<Control[]>(`${this.myAppUrl}${this.myApiUrl}`+'/control')
  }

  deleteProduct(id: number, nombre:string): Observable<void>{
    const nameClient = {nombre_Admin: nombre}
    return this.http.delete<void>(`${this.myAppUrl}${this.myApiUrl}`+'/'+id, { body: nameClient })
  }

  addPark(park: Park): Observable<any>{
    return this.http.post(`${this.myAppUrl}${this.myApiUrl}`, park)
  }

  updatePark(park: Park): Observable<any>{
    return this.http.put(`${this.myAppUrl}${this.myApiUrl}`, park)
  }

}
