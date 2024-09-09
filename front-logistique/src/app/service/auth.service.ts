import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(email:string,password:string){
    return this.http.post<any>('http://127.0.0.1:8000/api/login', { email, password })
      .pipe(map(res => {
        if (res.token) {
          localStorage.setItem('token', res.token);
        }
        return res;
      } ));
  }
   logout() {
    localStorage.removeItem('token');
  }

  getToken() {
    return localStorage.getItem('token');
  }
  setToken(token: string) {
    localStorage.setItem('token', token);
  }

  public get loggedIn(): boolean {
    return localStorage.getItem('token') !== null;
  }

}
