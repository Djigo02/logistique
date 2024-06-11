import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private httpClient: HttpClient) {}

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  apiUrl: string = 'http://127.0.0.1:8000/api/users';

  getUsers(): Observable<User[]> {
    return this.httpClient.get<User[]>(this.apiUrl);
  }

  insertUser(user: User) {
    return this.httpClient.post(this.apiUrl, user, this.httpOptions);
  }

  deleteUser(id: any) {
    return this.httpClient.delete(this.apiUrl + id);
  }
  updateUser(user: any, id: any) {
    return this.httpClient.put(
      this.apiUrl + id,
      JSON.stringify(user),
      this.httpOptions
    );
  }
  getUserById(id: any) {
    return this.httpClient.get(this.apiUrl + id);
  }
}
