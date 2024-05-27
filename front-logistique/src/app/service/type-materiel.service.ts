import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class TypeMaterielService {

  constructor(private httpClient: HttpClient) { }

  httpOptions = {
    headers : new HttpHeaders({
      'Content-Type' : 'application/json',
    }),
  };

  getTypeMateriel(){
    return this.httpClient.get('http://localhost:8080/api/typesmateriels/');
  }

  insertTypeMateriel(typeMateriel : any){
    return this.httpClient.post('http://localhost:8080/api/typesmateriels/',typeMateriel);
  }

  deleteTypeMateriel(id : any){
    return this.httpClient.delete('http://localhost:8080/api/typesmateriels/'+id);
  }
  updateTypeMateriel(typeMateriel : any,id : any){
    return this.httpClient.put('http://localhost:8080/api/typesmateriels/'+id,JSON.stringify(typeMateriel),this.httpOptions);
  }
  getTypeMaterielById(id:any){
    return this.httpClient.get('http://localhost:8080/api/typesmateriels/'+id)
  }
}
