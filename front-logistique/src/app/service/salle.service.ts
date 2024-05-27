import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class SalleService {

  constructor(private httpClient: HttpClient) { }

  httpOptions = {
    headers : new HttpHeaders({
      'Content-Type' : 'application/json',
    }),
  };

  getSalle(){
    return this.httpClient.get('http://localhost:8080/api/salles/');
  }

  insertSalle(salle : any){
    return this.httpClient.post('http://localhost:8080/api/salles/',salle);
  }

  deleteSalle(id : any){
    return this.httpClient.delete('http://localhost:8080/api/salles/'+id);
  }
  updateSalle(salle : any,id : any){
    return this.httpClient.put('http://localhost:8080/api/salles/'+id,JSON.stringify(salle),this.httpOptions);
  }
  getSalleById(id:any){
    return this.httpClient.get('http://localhost:8080/api/salles/'+id)
  }
}
