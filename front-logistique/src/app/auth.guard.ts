import { Injectable } from '@angular/core';
import { CanActivate, Router} from '@angular/router';
import {AuthService} from "./service/auth.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService:AuthService,private router:Router) {
  }


  canActivate(): boolean {
    if (!this.authService.loggedIn) {
      // Redirige l'utilisateur vers la page de connexion s'il n'est pas authentifié
      this.router.navigate(['/login']);
      return false;
    }
    // Autorise l'accès à la route si l'utilisateur est authentifié
    return true;
  }

}
