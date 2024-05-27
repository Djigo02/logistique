import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class MaterielService {

  constructor(private httpClient : HttpClient) {}

  httpOptions = {
    headers : new HttpHeaders({
      'Content-Type' : 'application/json',
    }),
  };

  getTypeMateriel(){
    return this.httpClient.get('http://localhost:8080/api/materiels/');
  }

  insertMateriel(materiel : any){
    return this.httpClient.post('http://localhost:8080/api/materiels/',materiel);
  }

  deleteTypeMateriel(id : any){
    return this.httpClient.delete('http://localhost:8080/api/materiels/'+id);
  }
  updateTypeMateriel(materiel : any,id : any){
    return this.httpClient.put('http://localhost:8080/api/materiels'+id,JSON.stringify(materiel),this.httpOptions);
  }
  getTypeMaterielById(id:any){
    return this.httpClient.get('http://localhost:8080/api/materiels/'+id)
  }
}
