import {Component, OnInit} from '@angular/core';
import {Demande} from "../../model/demande";
import {DemandeService} from "../../service/demande.service";
import {Router} from "@angular/router";
import Swal from "sweetalert2";

@Component({
  selector: 'app-all-demande',
  templateUrl: './all-demande.component.html',
  styleUrls: ['./all-demande.component.css']
})
export class AllDemandeComponent  implements OnInit {

  demandesu:Demande[]=[];
  demande!:Demande;
  constructor(private demandeService:DemandeService,private route:Router) {
  }

  getallDemande(){
    this.demandeService.getDemandes().subscribe(res =>{
      this.demandesu = res;
      console.log(this.demandesu);
    });
  }

  ngOnInit(): void {
    this.getallDemande();
  }
  accept(id:number){
    this.demandeService.getDemande(id).subscribe(res =>{
      this.demande=res;
      this.demande.statut="acceptee";
      this.demandeService.updateDemande(this.demande.id,this.demande).subscribe(re=>{
        this.getallDemande();
        Swal.fire({
          position: "center",
          icon: "success",
          title: "  demande acceptee  avec success ",
          showConfirmButton: false,
          timer: 1500
        });
      });
    });
  }
  refuse(id:number){
    this.demandeService.getDemande(id).subscribe(res =>{
      this.demande=res;
      this.demande.statut="refusee";
      this.demandeService.updateDemande(this.demande.id,this.demande).subscribe(re=>{
        this.getallDemande();
        Swal.fire({
          position: "center",
          icon: "success",
          title: "  demande refusee  avec success ",
          showConfirmButton: false,
          timer: 1500
        });
      });
    });
  }
}
