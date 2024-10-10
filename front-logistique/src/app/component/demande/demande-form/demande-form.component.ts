import {Component, OnInit} from '@angular/core';
import {Demande} from "../../../model/demande";
import {Router} from "@angular/router";
import {DemandeService} from "../../../service/demande.service";
import {error} from "@angular/compiler-cli/src/transformers/util";


import { jwtDecode } from 'jwt-decode';
import {AuthService} from "../../../service/auth.service";
import {User} from "../../../model/user";
import Swal from "sweetalert2";
import {RoleService} from "../../../service/role.service";

@Component({
  selector: 'app-demande-form',
  templateUrl: './demande-form.component.html',
  styleUrls: ['./demande-form.component.css']
})
export class DemandeFormComponent implements OnInit{

  demande!:Demande;
  user!: any;
  demandeur!:number ;
  email: string = '';
  message: string = '';

  constructor(private role: RoleService,private route:Router,private demandeService:DemandeService,private authService: AuthService) {
  }


  goBack(){
    this.route.navigate(['admin/dashboard']);
  }


  onSubmit(): void {
    if (this.demande) {
      this.demande.idDemandeur = this.user.id; // Associer le demandeur à la demande
      this.demandeService.insertDemande(this.demande).subscribe(
        (response) => {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Demande envoyée avec succès",
            showConfirmButton: false,
            timer: 1500,
          });
          this.demande = new Demande(); // Réinitialiser la demande après l'envoi
          this.route.navigate(['admin/demandeForm']);
        },
        (error) => {
          Swal.fire({
            position: "center",
            icon: "error",
            title: "Une erreur est survenue lors de la demande.",
            showConfirmButton: false,
            timer: 1500,
          });
          console.error('Erreur:', error);
        }
      );
    }
  }

  ngOnInit(): void {
    this.demande=new Demande();
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

}
