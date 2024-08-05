import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Materiel} from "../model/materiel";

@Injectable({
  providedIn: 'root'
})
export class VoirListeMaterielService {
  // params ('nomtable', 'id')
  apiUrl: string = 'https://logistique.groupeisi.com/api/liste-materiel/';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private httpClient: HttpClient) { }

  getMateriels(nomtable: any, id: any): Observable<Materiel[]> {
    return this.httpClient.get<Materiel[]>(this.apiUrl + nomtable + '/' + id, this.httpOptions);
  }

}
