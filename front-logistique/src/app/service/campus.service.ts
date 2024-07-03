import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Campus} from "../model/campus"
import {Observable} from "rxjs";
import {Salle} from "../model/salle";

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
  getCampusById(id:any):Observable<Campus>{
    return this.httpClient.get<Campus>(this.apiUrl+id)
  }

  getSallesByCampusId(id:any):Observable<Salle[]>{
    return this.httpClient.get<Salle[]>(`http://localhost:8000/api/sallesin/${id}`,this.httpOptions);
  }
}
