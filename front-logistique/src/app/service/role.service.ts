import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Role } from '../model/role';

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

  apiUrl: string = 'http://logistique.groupeisi.com/api/roles/';

  getRole(): Observable<Role[]> {
    return this.httpClient.get<Role[]>(this.apiUrl);
  }
}
