import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import { Component, OnInit } from '@angular/core';
import { Materiel } from '../model/materiel';

@Injectable({
  providedIn: 'root'
})
export class MaterielService {
  apiUrl:string = 'http://127.0.0.1:8000/api/materiels';
  constructor(private httpClient : HttpClient) {}

  httpOptions = {
    headers : new HttpHeaders({
      'Content-Type' : 'application/json',
    }),
  };

  getTypeMateriel(){
    return this.httpClient.get(this.apiUrl);
  }

  insertMateriel(materiel : any){
    return this.httpClient.post(this.apiUrl,materiel,this.httpOptions);
  }

  deleteTypeMateriel(id : any){
    return this.httpClient.delete(this.apiUrl+id);
  }
  updateTypeMateriel(materiel : any,id : any){
    return this.httpClient.put(this.apiUrl+id,JSON.stringify(materiel),this.httpOptions);
  }
  getTypeMaterielById(id:any){
    return this.httpClient.get(this.apiUrl+id)
  }
}
