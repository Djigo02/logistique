import {Component, OnInit} from '@angular/core';
import {RoleService} from "../../service/role.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-profil',
  standalone: true,
  imports: [],
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css'],
})
export class ProfilComponent implements OnInit {

  constructor(private role: RoleService, private router: Router) {
  }

  user!: any;

  ngOnInit() {
    const userData = localStorage.getItem("user");
    if (userData) {
      this.user = JSON.parse(userData);
      this.role.getRoleByIdRole(this.user.id).subscribe(
        res=>{this.user.roleName = res.roleData.libelle}
      );
    } else {
      console.log("Aucun utilisateur trouvé dans le localStorage");
    }
  }

  goBack(){
    this.router.navigate(['/admin/dashboard']);
  }

}
