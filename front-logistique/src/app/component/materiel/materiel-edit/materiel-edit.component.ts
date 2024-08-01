import {Component, OnInit} from '@angular/core';
import {Materiel} from "../../../model/materiel";
import {ActivatedRoute} from "@angular/router";
import {MaterielService} from "../../../service/materiel.service";
import {FournisseurService} from "../../../service/fournisseur.service";
import {Fournisseur} from "../../../model/fournisseur";

@Component({
  selector: 'app-materiel-edit',
  templateUrl: './materiel-edit.component.html',
  styleUrls: ['./materiel-edit.component.css']
})
export class MaterielEditComponent implements OnInit{

  materiel!: Materiel;
  fournisseursList!: Fournisseur[];

  constructor(private route:ActivatedRoute,private materielService:MaterielService, private fournisseurService:FournisseurService) {
  }

  getMaterielById(){
    this.materielService.getMaterielById(this.route.snapshot.params['id']).subscribe(res =>{
      this.materiel=res;
    })
  }

  loadFounisseurs(){
    this.fournisseurService.getAllFournisseur().subscribe(res =>{
      if(res != null){
        this.fournisseursList = res;
      }
    })
  }

  ngOnInit() {
    this.getMaterielById();
    this.loadFounisseurs();
  }
}
