import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../../service/auth.service";

@Component({
  selector: 'app-navbar-admin',
  templateUrl: './navbar-admin.component.html',
  styleUrls: ['./navbar-admin.component.css']
})
export class NavbarAdminComponent implements OnInit {
  constructor(private router:Router,private authService:AuthService){}
  user!:any;
  ngOnInit(){
    const userData = localStorage.getItem("user");
    if (userData) {
      this.user = JSON.parse(userData);
    } else {
      console.log("Aucun utilisateur trouvé dans le localStorage");
    }
  }

  logout(){
    this.authService.logout();
    this.router.navigate(['login']);
  }


  // Aller au tableau de bord
  goToDashboard(){
    this.router.navigate(['/admin/dashboard']);
  }
}
