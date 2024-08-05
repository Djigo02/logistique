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
  apiUrl  : string =  'https://logistique.groupeisi.com/api/campus';
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
    return this.httpClient.delete(`${this.apiUrl}/`+id);
  }
  getCampusById(id:any):Observable<Campus>{
    return this.httpClient.get<Campus>(`${this.apiUrl}/`+id)
  }

  getSallesByCampusId(id:any):Observable<Salle[]>{
    return this.httpClient.get<Salle[]>(`https://logistique.groupeisi.com/api/sallesin/${id}`,this.httpOptions);
  }

  updateCampus(campus:Campus){
    return this.httpClient.put(this.apiUrl+campus.id, JSON.stringify(campus), this.httpOptions);
  }
}
