import {Component, OnInit} from '@angular/core';
import {Demande} from "../../../model/demande";
import {Router} from "@angular/router";
import {DemandeService} from "../../../service/demande.service";
import {error} from "@angular/compiler-cli/src/transformers/util";


import { jwtDecode } from 'jwt-decode';
import {AuthService} from "../../../service/auth.service";
import {User} from "../../../model/user";
import Swal from "sweetalert2";

@Component({
  selector: 'app-demande-form',
  templateUrl: './demande-form.component.html',
  styleUrls: ['./demande-form.component.css']
})
export class DemandeFormComponent implements OnInit{

  demande!:Demande;
  user: User | null = null;
  demandeur!:number ;

  constructor(private route:Router,private demandeService:DemandeService,private authService: AuthService) {
  }



  onSubmit(){
      this.demandeService.insertDemande(this.demande).subscribe(res =>{
        console.log("demande affectuer avec succes",this.demande);
        Swal.fire({
          position: "center",
          icon: "success",
          title: "  demande faite   avec success ",
          showConfirmButton: false,
          timer: 1500
        });
        this.route.navigate(['admin/demande']);
      },error1 => {
        Swal.fire({
          position: "center",
          icon: "error",
          title: "  Une erreur est survenue lors de la demande. ",
          showConfirmButton: false,
          timer: 1500
        });
      });
  }


  ngOnInit(): void {
    this.demande=new Demande();
    this.authService.getUser().subscribe({
      next: (user) => {
        this.user = user;
        this.demande.idDemandeur = this.user?.id ?? '';
        console.log('Utilisateur connecté :', this.user);

      },
      error: (err) => {

      }
    });
  }

}
