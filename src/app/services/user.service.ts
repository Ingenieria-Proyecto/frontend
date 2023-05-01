import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from '../interfaces/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private myAppUrl: string
  private userUrl: string

  constructor(private http: HttpClient) { 
    this.myAppUrl = environment.endpoint
    this.userUrl = 'api/users/'
  }

  signIn(user: User): Observable<any>{
    return this.http.post(`${this.myAppUrl}${this.userUrl}`, user)
  }

  login(user: User): Observable<string>{
    return this.http.post<string>(`${this.myAppUrl}${this.userUrl}/login`,user)
  }
  
}
