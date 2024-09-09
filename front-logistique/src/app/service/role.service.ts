import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Role } from '../model/role';
import {User} from "../model/user";

@Injectable({
  providedIn: 'root',
})
export class RoleService {
  constructor(private httpClient: HttpClient) {}

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  apiUrl: string = 'http://127.0.0.1:8000/api/roles';

  getRole(): Observable<Role[]> {
    return this.httpClient.get<Role[]>(this.apiUrl);
  }

  getRoleByIdRole(id:any){
    return this.httpClient.get<Role>(`${this.apiUrl}/` + id);
  }

}



