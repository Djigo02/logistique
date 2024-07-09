import {Component, OnInit} from '@angular/core';
import { MaterielService } from 'src/app/service/materiel.service';
import {Materiel} from "../../../model/materiel";
import {Router} from "@angular/router";

@Component({
  selector: 'app-lister-materiel',
  templateUrl: './lister-materiel.component.html',
  styleUrls: ['./lister-materiel.component.css']
})
export class ListerMaterielComponent implements OnInit{
  materiels :Materiel[] = [];

  constructor(private materielSerice: MaterielService,private router:Router) {
  }

  redirectTo(id : number){
    this.router.navigate(['/admin/matEdit',id]);
  }
  delete(id:number){
    this.materielSerice.deleteMateriel(id).subscribe(res =>{
      alert('materiel supprimer avec succces');
        this.getMaterielData();
    }, error => {
        console.error('Erreur lors de la supression du matériel:', error);
        alert('Erreur lors de la supression du matériel:');
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
  }

  goToAdd(){
    this.router.navigate(['/admin/materiel']);
  }

}
