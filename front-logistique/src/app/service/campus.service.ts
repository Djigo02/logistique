import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Campus} from "../model/campus"
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CampusService {
  constructor(private httpClient: HttpClient) { }
  apiUrl  : string =  'http://localhost:8000/api/campus/';
  httpOptions = {
    headers : new HttpHeaders({
      'Content-Type' : 'application/json',
    }),
  };

  getCampus():Observable<Campus[]>{
    return this.httpClient.get<Campus[]>(this.apiUrl);
  }

  insertCampus(campus : Campus){
    return this.httpClient.post(this.apiUrl,campus,this.httpOptions);
  }

  deleteCampus(id : any){
    return this.httpClient.delete(this.apiUrl+id);
  }
  updateCampus(campus : Campus,id : any){
    return this.httpClient.put(this.apiUrl+id,JSON.stringify(campus),this.httpOptions);
  }
  getCampusById(id:any){
    return this.httpClient.get(this.apiUrl+id)
  }
}
