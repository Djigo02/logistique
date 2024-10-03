import {Component, OnInit} from '@angular/core';
import { MaterielService } from 'src/app/service/materiel.service';
import {Materiel} from "../../../model/materiel";
import {Router} from "@angular/router";
import Swal from "sweetalert2";
import {AuthService} from "../../../service/auth.service";
import {User} from "../../../model/user";
import {RoleService} from "../../../service/role.service";

@Component({
  selector: 'app-lister-materiel',
  templateUrl: './lister-materiel.component.html',
  styleUrls: ['./lister-materiel.component.css']
})
export class ListerMaterielComponent implements OnInit{
  materiels :Materiel[] = [];
  user: any | null = null;


  constructor(private authService:AuthService,private materielSerice: MaterielService,private router:Router, private role: RoleService) {
  }

  redirectTo(id : number){
    this.router.navigate(['/admin/matEdit',id]);
  }
  delete(id:number){
    this.materielSerice.deleteMateriel(id).subscribe(res =>{
        Swal.fire({
          position: "center",
          icon: "success",
          title: " materiel supprimer avec succces ",
          showConfirmButton: false,
          timer: 1500
        });
        this.getMaterielData();
    }, error => {
        Swal.fire({
          position: "center",
          icon: "error",
          title: " Erreur lors de la supression du matériel: ",
          showConfirmButton: false,
          timer: 1500
        });

      }
      );
  }
  getMaterielData() {
    this.materielSerice.getMateriel().subscribe(res => {
      this.materiels = res;
      console.log(this.materiels);
    });
  }
  ngOnInit() {
    this.getMaterielData();
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

  goToAdd(){
    this.router.navigate(['/admin/materiel']);
  }

}
