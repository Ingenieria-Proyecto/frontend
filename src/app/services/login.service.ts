import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Login, validateCode } from '../interfaces/login';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private myAppUrl: string
  private userUrl: string

  constructor(private http: HttpClient) {
    this.myAppUrl = environment.endpoint
    this.userUrl = 'api/login/'
   }

  createUser(login: Login): Observable<any>{
    return this.http.post(`${this.myAppUrl}${this.userUrl}`, login)
  }

  login(login: Login): Observable<string>{
    return this.http.post<string>(`${this.myAppUrl}${this.userUrl}/doubleAuth`,login)
  }

  validateAccess(validateCode: validateCode): Observable<any>{
    return this.http.post(`${this.myAppUrl}${this.userUrl}/validateAccess`,validateCode)
  }

  getUser(email:any): Observable<any>{
    return this.http.post(`${this.myAppUrl}${this.userUrl}/getUser`,email)
  }

}
