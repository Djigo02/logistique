import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import { Component, OnInit } from '@angular/core';
import { Materiel } from '../model/materiel';
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class MaterielService {
  apiUrl:string = 'https://logistique.groupeisi.com/api/materiels';
  constructor(private httpClient : HttpClient) {}

  getMatByTypeMat(id: any): Observable<Materiel[]> {
    return this.httpClient.get<Materiel[]>(`https://logistique.groupeisi.com/api/getmatbytypemat/`+id);
  }

  httpOptions = {
    headers : new HttpHeaders({
      'Content-Type' : 'application/json',
    }),
  };



  getMateriel():Observable<Materiel[]>{
    return this.httpClient.get<Materiel[]>(this.apiUrl);
  }

  insertMateriel(materiel : Materiel){
    /**
     * verifier si l'0bjet materiel.amortissement est une instance de date avec instanceof
     * toLocaleDateString() renvoyer une représentation de la date sous forme de chaîne de caractères, puis split pour diviser la chaine
     * en tableau avec comme indicateur le / et enfin recontruire la chaine en changant le format
     */
    if (materiel.amortissement instanceof Date) {
      const amortissementDate = materiel.amortissement.toLocaleDateString().split('/');
      const amortissement = `${amortissementDate[2]}-${amortissementDate[1]}-${amortissementDate[0]}`;
      materiel.amortissement = new Date(amortissement);
    }
    if (materiel.dateEnregistrement instanceof Date) {
     // Convertir la date d'amortissement au format requis
     const dateEnregistrement = materiel.dateEnregistrement.toLocaleDateString().split('/');
     const dateEnregistrementF = `${dateEnregistrement[2]}-${dateEnregistrement[1]}-${dateEnregistrement[0]}`;
     // Assigner la nouvelle valeur à materiel.amortissement
     materiel.dateEnregistrement = new Date(dateEnregistrementF);
    }
    return this.httpClient.post(this.apiUrl,materiel,this.httpOptions);
  }

  deleteMateriel(id : any){
    return this.httpClient.delete(`${this.apiUrl}/`+id);
  }
  updateTypeMateriel(materiel : any,id : any){
    if (materiel.amortissement instanceof Date) {
      const amortissementDate = materiel.amortissement.toLocaleDateString().split('/');
      const amortissement = `${amortissementDate[2]}-${amortissementDate[1]}-${amortissementDate[0]}`;
      materiel.amortissement = new Date(amortissement);
    }
    if (materiel.dateEnregistrement instanceof Date) {
      // Convertir la date d'amortissement au format requis
      const dateEnregistrement = materiel.dateEnregistrement.toLocaleDateString().split('/');
      const dateEnregistrementF = `${dateEnregistrement[2]}-${dateEnregistrement[1]}-${dateEnregistrement[0]}`;
      // Assigner la nouvelle valeur à materiel.amortissement
      materiel.dateEnregistrement = new Date(dateEnregistrementF);
    }
    return this.httpClient.put(`${this.apiUrl}/`+id,JSON.stringify(materiel),this.httpOptions);
  }
  getMaterielById(id:any):Observable<Materiel>{
    return this.httpClient.get<Materiel>(`${this.apiUrl}/`+id);
  }
}
