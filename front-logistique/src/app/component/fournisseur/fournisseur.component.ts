import {Component, OnInit} from '@angular/core';
import {FournisseurService} from "../../service/fournisseur.service";
import {Fournisseur} from "../../model/fournisseur";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-fournisseur',
  templateUrl: './fournisseur.component.html',
  styleUrls: ['./fournisseur.component.css']
})
export class FournisseurComponent implements OnInit{

  fournisseur!:any;
  founisseurs:Fournisseur[]=[];
  constructor(private fournisseurService:FournisseurService,private router:Router, private notification :ToastrService) {
    this.fournisseur=new Fournisseur();
  }

  ngOnInit() {
    this.fournisseur = new Fournisseur();
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
        this.notification.success(`Fournisseur ajoute avec success`,"Operation success");
        this.router.navigate(['admin/listesutilisateurs']);

      }, error => {
        console.error('Erreur lors de l\'enregistrement du fournisseur:', error);
        this.notification.error(`Une erreur est survenue lors de l\'enregistrement du fournisseur.`,"Operation echouer");
      })
  }

  getFournisseur(){
    this.fournisseurService.getAllFournisseur().subscribe(res => {
      this.founisseurs=res;
    })
  }
}
