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

  getDemandes():Observable<any[]>{
    return this.httpClient.get<any[]>(this.apiUrl);
  }
  gedemandeRefuser():Observable<any[]>{
    return this.httpClient.get<any[]>(`http://127.0.0.1:8000/api/gedemandeRefuser`);
  }

  getdemandeAchetee():Observable<any[]>{
    return this.httpClient.get<any[]>(`http://127.0.0.1:8000/api/getdemandeAchetee`);
  }
  getdemande():Observable<any[]>{
    return this.httpClient.get<any[]>(`http://127.0.0.1:8000/api/getdemande`);
  }
  getDemandeUser(idUser:any):Observable<any[]>{
    return this.httpClient.get<any[]>(`http://127.0.0.1:8000/api/demandeUser/`+idUser);
  }


  sendMail(destiMail:string,idDemande:number){
    return this.httpClient.get('http://127.0.0.1:8000/api/send_email/'+destiMail+'/'+idDemande);
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
