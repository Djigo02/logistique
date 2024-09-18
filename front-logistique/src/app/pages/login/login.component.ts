import { Component } from '@angular/core';
import {AuthService} from "../../service/auth.service";
import {Router} from "@angular/router";
import {User} from "../../model/user";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent  {

  email: string = '';
  password: string = '';

  constructor(private authService : AuthService,private router:Router) {
  }
  onSubmit() {
    this.authService.login(this.email, this.password).subscribe(res => {
        // Stocker le token reçu après connexion
        sessionStorage.setItem('access_token',res.access_token);
        this.authService.setToken(res.access_token);  // Stocke le token dans localStorage ou sessionStorage

        console.log('Connexion réussie !');
        const token = sessionStorage.getItem('access_token');
        console.log('Token récupéré du localStorage:', token);
        // Récupère les informations utilisateur
        const user = this.authService.getUser();
        console.log('Utilisateur connecté :', user);
        this.router.navigate(['/admin/dashboard']);
      },
      (err) => {
        console.error('Échec de la connexion :', err);
      });
  }




}
