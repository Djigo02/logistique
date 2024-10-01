import { Component } from '@angular/core';
import {AuthService} from "../../service/auth.service";
import {Router} from "@angular/router";
import {User} from "../../model/user";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent  {

  email: string = '';
  password: string = '';

  constructor(private authService : AuthService,private router:Router, private notification: ToastrService) {
  }
  onSubmit() {
    this.authService.login(this.email, this.password).subscribe(res => {
        // Stocker le token reçu après connexion
        sessionStorage.setItem('access_token',res.access_token);
        this.authService.setToken(res.access_token);  // Stocke le token dans localStorage ou sessionStorage
        localStorage.setItem('user',JSON.stringify(res.user));
        this.notification.success('Connexion réussie!','Connexion');
        this.router.navigate(['/admin/dashboard']);
      },
      (err) => {
        console.error('Échec de la connexion :', err);
        this.notification.error('Échec de la connexion: Email ou mot de passe incorrect','Connexion');
      });
  }




}
