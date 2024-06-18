import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Salle} from "../model/salle";

@Injectable({
  providedIn: 'root'
})
export class SalleService {

  constructor(private httpClient: HttpClient) { }

  httpOptions = {
    headers : new HttpHeaders({
      'Content-Type' : 'application/json',
    }),
  };

  apiUrl  : string =  'http://localhost:8000/api/salles/';

  getSalles():Observable<Salle[]>{
    return this.httpClient.get<Salle[]>(this.apiUrl);
  }

  insertSalle(salle : Salle){
    return this.httpClient.post(this.apiUrl,salle,this.httpOptions);
  }

  getSalleById(id:any): Observable<Salle>{
    return this.httpClient.get<Salle>(this.apiUrl+id,this.httpOptions);
  }
}
