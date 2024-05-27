import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AffectationService {

  constructor(private httpClient: HttpClient) { }

  httpOptions = {
    headers : new HttpHeaders({
      'Content-Type' : 'application/json',
    }),
  };

  getAffectation(){
    return this.httpClient.get('http://localhost:8080/api/affectations/');
  }

  insertAffectation(affectation : any){
    return this.httpClient.post('http://localhost:8080/api/affectations/',affectation);
  }

  deleteAffectation(id : any){
    return this.httpClient.delete('http://localhost:8080/api/affectations/'+id);
  }
  updateAffectation(affectation : any,id : any){
    return this.httpClient.put('http://localhost:8080/api/affectations/'+id,JSON.stringify(affectation),this.httpOptions);
  }
  getAffectationById(id:any){
    return this.httpClient.get('http://localhost:8080/api/affectations/'+id)
  }
}
