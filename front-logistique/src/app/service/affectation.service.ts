import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {TypeMateriel} from "../model/type-materiel";
import {Affectation} from "../model/affectation";

@Injectable({
  providedIn: 'root'
})
export class AffectationService {

  constructor(private httpClient: HttpClient) { }

   apiUrl:string = "https://logistique.groupeisi.com/api/affectations"

  httpOptions = {
    headers : new HttpHeaders({
      'Content-Type' : 'application/json',
    }),
  };

  getAffectationFNT(nomTable:string):Observable<any[]>{
    return this.httpClient.get<any>(`https://logistique.groupeisi.com/api/getAllAffectationForNT/`+nomTable);
  }

  getAffectationByUser(idU: number):Observable<Affectation[]>{
    return this.httpClient.get<Affectation[]>(`https://logistique.groupeisi.com/api/getAffectationByUser/`+idU);

  }
  insertAffectation(affectation : any){
    return this.httpClient.post(`${this.apiUrl}`,affectation,this.httpOptions);
  }

  deleteAffectation(id : any){
    return this.httpClient.delete(`${this.apiUrl}/`+id);
  }

  updateAffectation(affectation : any,id : any){
    return this.httpClient.put(`${this.apiUrl}/`+id,JSON.stringify(affectation),this.httpOptions);
  }

  getAffectationById(id:any):Observable<Affectation>{
    return this.httpClient.get<Affectation>(`${this.apiUrl}/`+id)
  }

  transfererMateriel(affectation : any){
    return this.httpClient.post(`https://logistique.groupeisi.com/api/transfert-materiel/`,affectation,this.httpOptions);
  }

}
