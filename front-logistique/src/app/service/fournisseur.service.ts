import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {TypeMateriel} from "../model/type-materiel";
import {Fournisseur} from "../model/fournisseur";

@Injectable({
  providedIn: 'root'
})
export class FournisseurService {

   apiUrl : string = 'https://logistique.groupeisi.com/api/fournisseurs';

  constructor(private httpClient: HttpClient) { }

  httpOptions = {
    headers : new HttpHeaders({
      'Content-Type' : 'application/json',
    }),
  };

  getAllFournisseur(): Observable<Fournisseur[]> {
    return this.httpClient.get<Fournisseur[]>(`${this.apiUrl}`);
  }


  insertFournisseur(fournisseur : any){
    return this.httpClient.post(`${this.apiUrl}/`,fournisseur);
  }

  deleteFournisseur(id : any){
    return this.httpClient.delete(`${this.apiUrl}/`+id);
  }
  updateFournisseur(fournisseur : any,id : any){
    return this.httpClient.put(`${this.apiUrl}/`+id,JSON.stringify(fournisseur),this.httpOptions);
  }
  getFournisseurById(id:any){
    return this.httpClient.get(`${this.apiUrl}/`+id)
  }
}
