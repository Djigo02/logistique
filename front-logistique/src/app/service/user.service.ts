import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private httpClient: HttpClient) { }

  httpOptions = {
    headers : new HttpHeaders({
      'Content-Type' : 'application/json',
    }),
  };

  getUser(){
    return this.httpClient.get('http://localhost:8080/api/users/');
  }

  insertUser(user : any){
    return this.httpClient.post('http://localhost:8080/api/users/',user);
  }

  deleteUser(id : any){
    return this.httpClient.delete('http://localhost:8080/api/users/'+id);
  }
  updateUser(user : any,id : any){
    return this.httpClient.put('http://localhost:8080/api/users/'+id,JSON.stringify(user),this.httpOptions);
  }
  getUserById(id:any){
    return this.httpClient.get('http://localhost:8080/api/users/'+id)
  }
}
