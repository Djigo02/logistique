import 'dropify/dist/js/dropify.js';
import * as $ from 'jquery';
import { Component, OnInit } from '@angular/core';
import { Materiel } from 'src/app/model/materiel';
import {MaterielService} from "../../service/materiel.service";
import {Router} from "@angular/router";
import {FournisseurService} from "../../service/fournisseur.service";
import {TypeMaterielService} from "../../service/type-materiel.service";
import {Fournisseur} from "../../model/fournisseur";
import {TypeMateriel} from "../../model/type-materiel";
import {ToastrService} from "ngx-toastr";


@Component({
  selector: 'app-materiel',
  templateUrl: './materiel.component.html',
  styleUrls: ['./materiel.component.css'],
})
export class MaterielComponent implements OnInit {

  materiel! : any;
  fournisseur!:any;
  fournisseursList!:Fournisseur[];
  typeMateriel!: TypeMateriel;
  constructor(private router : Router,private fournisseurService : FournisseurService, private notification :ToastrService){}

  ngOnInit(): void {
    this.materiel = new Materiel();
    this.fournisseur= new Fournisseur();
    this.typeMateriel = new TypeMateriel();
    this.loadFounisseurs();
  }
  insertFournisseur(){
    this.fournisseurService.insertFournisseur(this.fournisseur).subscribe(
      res =>{
      console.log(res);
      this.fournisseur.nom="";
      this.fournisseur.telephone="";
      this.fournisseur.adresse="";
      this.fournisseur.email="";
      this.fournisseur.ninea="";
      this.notification.success(`Fournisseur ajoute avec success`,"Operation success");
      this.loadFounisseurs();
      this.router.navigate(['admin/materiel']);
    }, error => {
      console.error('Erreur lors de l\'enregistrement du fournisseur:', error);
      this.notification.error(`Une erreur est survenue lors de l\'enregistrement du fournisseur.`,"Operation echouer");
    })
  }
  loadFounisseurs(){
    this.fournisseurService.getAllFournisseur().subscribe(res =>{
      if(res != null){
        this.fournisseursList = res;
      }
    })
  }


}
