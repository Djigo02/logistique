import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../../service/auth.service";
import {RoleService} from "../../service/role.service";

@Component({
  selector: 'app-navbar-admin',
  templateUrl: './navbar-admin.component.html',
  styleUrls: ['./navbar-admin.component.css']
})
export class NavbarAdminComponent implements OnInit {
  constructor(private router:Router,private authService:AuthService, private role: RoleService){}
  user!:any;
  ngOnInit(){
    const userData = localStorage.getItem("user");
    if (userData) {
      this.user = JSON.parse(userData);
      this.role.getRoleByIdRole(this.user.idRole).subscribe(
        res=>{this.user.roleName = res.roleData.libelle}
      );
    } else {
      console.log("Aucun utilisateur trouvé dans le localStorage");
    }
  }

  logout(){
    sessionStorage.removeItem('access_token');
    localStorage.clear();
    this.router.navigate(['/']);
    setTimeout( () => {
      window.location.reload();
    }, 600);
  }

  voirMateriels(nomtable: string, id:any){
    this.router.navigate(['/admin/voir-materiels',nomtable,id]);
  }

  // Aller au tableau de bord
  goToDashboard(){
    this.router.navigate(['/admin/dashboard']);
  }
  goToProfil(){
    this.router.navigate(['/admin/profil']);
  }


}
