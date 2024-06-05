import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import { TypeMateriel } from '../model/type-materiel';
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TypeMaterielService {
//Normal
  constructor(private httpClient: HttpClient) { }

  apiUrl:string = 'http://localhost:8080/api/typesmateriels/';

  httpOptions = {
    headers : new HttpHeaders({
      'Content-Type' : 'application/json',
    }),
  };

  getTypeMateriel(){
    return this.httpClient.get(this.apiUrl);
  }

  getAllTypeMateriels(): Observable<TypeMateriel[]> {
    return this.httpClient.get<TypeMateriel[]>(this.apiUrl);
  }

  insertTypeMateriel(typeMateriel : TypeMateriel){
    return this.httpClient.post(this.apiUrl,typeMateriel);
  }
  deleteTypeMateriel(id : number){
    return this.httpClient.delete(this.apiUrl+id);
  }
  updateTypeMateriel(typeMateriel : TypeMateriel,id : number){
    return this.httpClient.put(this.apiUrl+id,JSON.stringify(typeMateriel),this.httpOptions);
  }
  getTypeMaterielById(id:number){
    return this.httpClient.get(this.apiUrl+id)
  }
}
