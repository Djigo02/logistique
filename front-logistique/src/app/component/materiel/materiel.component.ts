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


@Component({
  selector: 'app-materiel',
  templateUrl: './materiel.component.html',
  styleUrls: ['./materiel.component.css'],
})
export class MaterielComponent implements OnInit {

  materiel! : any;
  fournisseur!:any;
  typeMateriel!: TypeMateriel;
  constructor(private router : Router,private fournisseurService : FournisseurService){}

  ngOnInit(): void {
    this.materiel = new Materiel();
    this.fournisseur= new Fournisseur();
    this.typeMateriel = new TypeMateriel();
  }
  insertFournisseur(){
    this.fournisseurService.insertFournisseur(this.fournisseur).subscribe(
      res =>{
      alert('fournisseur ajouter avec succes');
      console.log(res);
      this.fournisseur.nom="";
      this.fournisseur.telephone="";
      this.fournisseur.adresse="";
      this.fournisseur.email="";
      this.fournisseur.ninea="";
      this.fournisseur.registreDeCommerce="";
      this.router.navigate(['admin/materiel']);

    }, error => {
      console.error('Erreur lors de l\'enregistrement du fournisseur:', error);
      alert('Une erreur est survenue lors de l\'enregistrement du fournisseur.');
    })
  }
}
