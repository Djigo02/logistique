import {Component, OnInit} from '@angular/core';
import {TypeMateriel} from "../../../model/type-materiel";
import {TypeMaterielService} from "../../../service/type-materiel.service";
import {Router} from "@angular/router";

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
      alert('materiel supprimer avec succces');
      this.getDataTypeMateriel();
    },
      error => {
        console.error('Erreur lors de la suppression du matériel:', error);
        alert('Une erreur est survenue lors de suppression du matériel.');
      }
      );
  }
  redirectTo(id : number){
    this.router.navigate(['/admin/editTypemateriels',id]);
  }

}
