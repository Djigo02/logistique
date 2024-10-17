import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Demande} from "../model/demande";

@Injectable({
  providedIn: 'root'
})
export class DemandeService {

  apiUrl:string = 'https://logistique.groupeisi.com/api/demandes';
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
    return this.httpClient.get<Demande[]>(`https://logistique.groupeisi.com/api/gedemandeRefuser`);
  }
  getdemandeFournies():Observable<Demande[]>{
    return this.httpClient.get<Demande[]>(`https://logistique.groupeisi.com/api/getdemandeFournies`);
  }
  getdemande():Observable<Demande[]>{
    return this.httpClient.get<Demande[]>(`https://logistique.groupeisi.com/api/getdemande`);
  }
  getDemandeUser(idUser:any):Observable<Demande[]>{
    return this.httpClient.get<Demande[]>(`https://logistique.groupeisi.com/api/demandeUser/`+idUser);
  }


  sendMail(destiMail:string,idDemande:number){
    return this.httpClient.get('https://logistique.groupeisi.com/api/send_email/'+destiMail+'/'+idDemande);
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

    return this.httpClient.post<any>(this.apiUrl, demande, { headers });
  }


  deleteDemande(id:any){
    return this.httpClient.delete(`${this.apiUrl}/`+id)
  }
  updateDemande(id : number,demande:Demande){
    return this.httpClient.put(`${this.apiUrl}/`+id ,JSON.stringify(demande), this.httpOptions);
  }
}
