import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class CampusService {
  constructor(private httpClient: HttpClient) { }

  httpOptions = {
    headers : new HttpHeaders({
      'Content-Type' : 'application/json',
    }),
  };

  getCampus(){
    return this.httpClient.get('http://localhost:8080/api/campus/');
  }

  insertCampus(campus : any){
    return this.httpClient.post('http://localhost:8080/api/campus/',campus);
  }

  deleteUser(id : any){
    return this.httpClient.delete('http://localhost:8080/api/campus/'+id);
  }
  updateCampus(campus : any,id : any){
    return this.httpClient.put('http://localhost:8080/api/campus/'+id,JSON.stringify(campus),this.httpOptions);
  }
  getCampusById(id:any){
    return this.httpClient.get('http://localhost:8080/api/campus/'+id)
  }
}
