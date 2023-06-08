import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Schedule } from '../interfaces/schedule';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {

  private myAppUrl: string
  private scheduleUrl: string

  constructor(private http: HttpClient) { 
    this.myAppUrl = environment.endpoint
    this.scheduleUrl = 'api/schedule/'
  }
  getListSchedule(): Observable<Schedule[]> {

    return this.http.get<Schedule[]>(`${this.myAppUrl}${this.scheduleUrl}`)
  }

    getSchedule(id: number): Observable<Schedule>{
    return this.http.get<Schedule>(`${this.myAppUrl}${this.scheduleUrl}${id}`)
  }

}
