import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class FournisseurService {


  constructor(private httpClient: HttpClient) { }

  httpOptions = {
    headers : new HttpHeaders({
      'Content-Type' : 'application/json',
    }),
  };

  getFournisseur(){
    return this.httpClient.get('http://localhost:8080/api/fournisseurs/');
  }

  insertFournisseur(fournisseur : any){
    return this.httpClient.post('http://localhost:8080/api/fournisseurs/',fournisseur);
  }

  deleteFournisseur(id : any){
    return this.httpClient.delete('http://localhost:8080/api/fournisseurs/'+id);
  }
  updateFournisseur(fournisseur : any,id : any){
    return this.httpClient.put('http://localhost:8080/api/fournisseurs/'+id,JSON.stringify(fournisseur),this.httpOptions);
  }
  getFournisseurById(id:any){
    return this.httpClient.get('http://localhost:8080/api/fournisseurs/'+id)
  }
}
