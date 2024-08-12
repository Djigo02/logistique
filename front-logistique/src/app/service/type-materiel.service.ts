import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TypeMateriel } from '../model/type-materiel';
import { Observable } from 'rxjs';
import {Materiel} from "../model/materiel";

@Injectable({
  providedIn: 'root',
})
export class TypeMaterielService {
  //Normal
  constructor(private httpClient: HttpClient) {}

  apiUrl: string = 'https://logistique.groupeisi.com/api/typesmateriels';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  getTypeMateriel():Observable<TypeMateriel[]> {
    return this.httpClient.get<TypeMateriel[]>(`${this.apiUrl}`);
  }

  getAllTypeMateriels(): Observable<TypeMateriel[]> {
    return this.httpClient.get<TypeMateriel[]>(`${this.apiUrl}`);
  }

  insertTypeMateriel(typeMateriel: TypeMateriel) {
    return this.httpClient.post(`${this.apiUrl}`, typeMateriel, this.httpOptions)
  }

  deleteTypeMateriel(id: any) {
    return this.httpClient.delete(`${this.apiUrl}/`+id);
  }

  updateTypeMateriel(typeMateriel: Object, id: number) {
    return this.httpClient.put(
      `${this.apiUrl}/` + id,
      JSON.stringify(typeMateriel),
      this.httpOptions
    );
  }
  getTypeMaterielById(id: number):Observable<TypeMateriel> {
    return this.httpClient.get<TypeMateriel>(`${this.apiUrl}/`+id);
  }
}
