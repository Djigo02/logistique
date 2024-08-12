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

  apiUrl  : string =  'https://logistique.groupeisi.com/api/salles';

  getSalles():Observable<Salle[]>{
    return this.httpClient.get<Salle[]>(this.apiUrl);
  }

  getSalleByCampus(id : number):Observable<Salle[]>{
    return this.httpClient.get<Salle[]>(`https://logistique.groupeisi.com/api/sallesin/`+id);
  }

  insertSalle(salle : Salle){
    return this.httpClient.post(this.apiUrl,salle,this.httpOptions);
  }

  getSalleById(id:any): Observable<Salle>{
    return this.httpClient.get<Salle>(`${this.apiUrl}/`+id,this.httpOptions);
  }

  deleteSalle(id:any){
    return this.httpClient.delete(`${this.apiUrl}/`+id);
  }

  updateSalle(salle : Salle){
    return this.httpClient.put(`${this.apiUrl}/`+salle.id,JSON.stringify(salle),this.httpOptions);
  }
}
