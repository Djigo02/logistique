import {Component, OnInit} from '@angular/core';
import {TypeMateriel} from "../../../model/type-materiel";
import {TypeMaterielService} from "../../../service/type-materiel.service";
import {Router} from "@angular/router";
import Swal from "sweetalert2";

@Component({
  selector: 'app-liste-typemateriel',
  templateUrl: './liste-typemateriel.component.html',
  styleUrls: ['./liste-typemateriel.component.css']
})
export class ListeTypematerielComponent implements OnInit{

  typemateriels:TypeMateriel[]=[];
  typeMateriel!:TypeMateriel;

  constructor(private typematerielService:TypeMaterielService,private router:Router) {
  }
  ngOnInit() {
    this.getDataTypeMateriel();
    this.typeMateriel= new TypeMateriel();
  }

  getDataTypeMateriel(){
    this.typematerielService.getTypeMateriel().subscribe(res =>{
      this.typemateriels=res;
      console.log(this.typemateriels);
    });
  }
  delete(id:any){
    this.typematerielService.deleteTypeMateriel(id).subscribe(res =>{
        Swal.fire({
          position: "center",
          icon: "success",
          title: " Type materiel supprimer avec success ",
          showConfirmButton: false,
          timer: 1500
        });
      this.getDataTypeMateriel();
    },
      error => {
        Swal.fire({
          position: "center",
          icon: "error",
          title: " probleme lors de la suppression ",
          showConfirmButton: false,
          timer: 1500
        });
      }
      );
  }
  redirectTo(id : number){
    this.router.navigate(['/admin/editTypemateriels',id]);
  }
  goToTMForm(){
    this.router.navigate(['/admin/typeMateriel'])
  }
}
