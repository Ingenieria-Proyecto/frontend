import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  private myAppUrl: string

  constructor(private http: HttpClient) { 
    this.myAppUrl = "https://restcountries.com/v3.1/all"
  }

  getListCountry(): Observable<any> {
    return this.http.get<any>(`${this.myAppUrl}`)
  }
}
