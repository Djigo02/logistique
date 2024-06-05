import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Campus} from "../model/campus"

@Injectable({
  providedIn: 'root'
})
export class CampusService {
  constructor(private httpClient: HttpClient) { }
  apiUrl  : string =  'http://localhost:8080/api/campus/';
  httpOptions = {
    headers : new HttpHeaders({
      'Content-Type' : 'application/json',
    }),
  };

  getCampus(){
    return this.httpClient.get(this.apiUrl);
  }

  insertCampus(campus : Campus){
    return this.httpClient.post(this.apiUrl,campus);
  }

  deleteUser(id : any){
    return this.httpClient.delete(this.apiUrl+id);
  }
  updateCampus(campus : any,id : any){
    return this.httpClient.put(this.apiUrl+id,JSON.stringify(campus),this.httpOptions);
  }
  getCampusById(id:any){
    return this.httpClient.get(this.apiUrl+id)
  }
}
