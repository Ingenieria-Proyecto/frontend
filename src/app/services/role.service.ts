import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Role } from '../interfaces/role';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  private myAppUrl: string
  private myApiUrl: string

  constructor(private http: HttpClient) {
    this.myAppUrl = environment.endpoint
    this.myApiUrl = "api/role/"
  }

  getListRoles(): Observable<Role[]> {

    return this.http.get<Role[]>(`${this.myAppUrl}${this.myApiUrl}`)
  }

  deleteRole(id: number): Observable<string>{
    return this.http.delete<string>(`${this.myAppUrl}${this.myApiUrl}${id}`)
  }

  saveRole(role: Role): Observable<void>{
    return this.http.post<void>(`${this.myAppUrl}${this.myApiUrl}`,role)
  }

  getRole(id: number): Observable<Role>{
    return this.http.get<Role>(`${this.myAppUrl}${this.myApiUrl}${id}`)
  }

  updateRole(role: Role): Observable<void>{
    return this.http.put<void>(`${this.myAppUrl}${this.myApiUrl}`, role)
  }


}
