import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {User} from "../model/user";
import { jwtDecode } from 'jwt-decode';
import {UserService} from "./user.service";
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient,private userService:UserService) { }



  login(email: string, password: string) {
    return this.http.post<any>('http://127.0.0.1:8000/api/login', { email, password })
      .pipe(map(res => {
        console.log('Réponse complète de l\'API:', res);
        if (res.access_token) {
          console.log('Token reçu :', res.access_token);
          sessionStorage.setItem('access_token', res.access_token);
          // Stocke correctement le token
        } else {
          console.error('Token non présent dans la réponse de l\'API');
        }
        return res;
      }));
  }





  getUser(): Observable<User> {
    const token = sessionStorage.getItem('access_token');
    if (token) {

      const tokenPayload = this.decodeToken(token);
      if (tokenPayload && tokenPayload.sub) {
        // Récupère les détails de l'utilisateur à partir de l'ID stocké dans le token

        return this.userService.getUserById(tokenPayload.sub);
      }
    }

    return new Observable<User>();
  }




  decodeToken(token: string) {
    if (!token) {
      return null; // retourne null si le token n'existe pas
    }

    const payload = token.split('.')[1];

    try {
      // Correction du format base64url pour le rendre compatible avec atob()
      const base64 = payload.replace(/-/g, '+').replace(/_/g, '/');

      // Ajout de padding si nécessaire pour que la longueur soit un multiple de 4
      const paddedBase64 = base64.padEnd(base64.length + (4 - base64.length % 4) % 4, '=');

      return JSON.parse(atob(paddedBase64));  // Décode le token JWT
    } catch (e) {
      console.error('Erreur lors du décodage du token:', e);
      return null;
    }
  }




  isLoggedIn(): boolean {
    const token = this.getToken();
    // Vérifie si le token existe et est valide
    return !!token;
  }

  logout() {
    sessionStorage.removeItem('access_token');
  }


  getToken(): string | null {
    return sessionStorage.getItem('access_token'); // ou sessionStorage selon votre implémentation
  }



  setToken(token: string) {
    sessionStorage.setItem('access_token', token);
  }

  public get loggedIn(): boolean {
    return sessionStorage.getItem('access_token') !== null;
  }

}
