import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(private httpClient : HttpClient) { }

  httpOptions = {
    headers : new HttpHeaders({
      'Content-Type' : 'application/json',
    }),
  };
  getRole(){
    return this.httpClient.get('http://localhost:8080/ api/roles/');
  }

  insertRole(role : any){
    return this.httpClient.post('http://localhost:8080/api/roles/',role);
  }

  deleteRole(id : any){
    return this.httpClient.delete('http://localhost:8080/api/roles/'+id);
  }
  updateRole(role : any,id : any){
    return this.httpClient.put('http://localhost:8080/api/roles/'+id,JSON.stringify(role),this.httpOptions);
  }
  getRoleById(id:any){
    return this.httpClient.get('http://localhost:8080/api/roles/'+id)
  }
}
