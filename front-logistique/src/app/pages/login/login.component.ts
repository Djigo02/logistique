import { Component } from '@angular/core';
import {AuthService} from "../../service/auth.service";
import {Router} from "@angular/router";

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
  onSubmit(){
    this.authService.login(this.email,this.password).subscribe(res =>{
      this.authService.setToken(res.token);
        console.log('Login successful!');

        this.router.navigate(['/admin/dashboard']);
    },
      (err) => {
        console.error('Login failed:', err);
      }
      )
  }

}
