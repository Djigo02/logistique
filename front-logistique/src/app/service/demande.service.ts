import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Demande} from "../model/demande";

@Injectable({
  providedIn: 'root'
})
export class DemandeService {

  apiUrl:string = 'http://127.0.0.1:8000/api/demandes';
  constructor(private httpClient:HttpClient) { }

  httpOptions ={
    headers : new HttpHeaders({
      'Content-Type' : 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('access_token')}`
    }),
  };

  getDemandes():Observable<Demande[]>{
    return this.httpClient.get<Demande[]>(this.apiUrl);
  }
  gedemandeRefuser():Observable<Demande[]>{
    return this.httpClient.get<Demande[]>(`http://127.0.0.1:8000/api/gedemandeRefuser`);
  }
  getdemande():Observable<Demande[]>{
    return this.httpClient.get<Demande[]>(`http://127.0.0.1:8000/api/getdemande`);
  }
  getDemandeUser(idUser:any):Observable<Demande[]>{
    return this.httpClient.get<Demande[]>(`http://127.0.0.1:8000/api/demandeUser/`+idUser);
  }

  getDemande(id:any):Observable<Demande>{
    return this.httpClient.get<Demande>(`${this.apiUrl}/`+id)
  }
  insertDemande(demande:Demande): Observable<Demande>{
    const token = localStorage.getItem('access_token');


    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    return this.httpClient.post<Demande>(this.apiUrl, demande, { headers });
  }


  deleteDemande(id:any){
    return this.httpClient.delete(`${this.apiUrl}/`+id)
  }
  updateDemande(id : number,demande:Demande){
    return this.httpClient.put(`${this.apiUrl}/`+id ,JSON.stringify(demande), this.httpOptions);
  }
}
