import {Component, Input, OnInit} from '@angular/core';
import {Fournisseur} from "../../model/fournisseur";
import {FournisseurService} from "../../service/fournisseur.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-fournisseur-form',
  templateUrl: './fournisseur-form.component.html',
  styleUrls: ['./fournisseur-form.component.css']
})
export class FournisseurFormComponent implements OnInit{

  @Input()fournisseur!:Fournisseur;
  founisseurs : Fournisseur[]=[];
  isAddForm!:boolean;
  constructor(private founisseurService:FournisseurService,private  router:Router) {
  }
  onSubmit(){
    if(this.isAddForm){
      this.handleSubmit();
    }else{
      this.updateFournisseur();
    }
  }
  handleSubmit() {
    this.founisseurService.insertFournisseur(this.fournisseur).subscribe({
      next: (res) => {
        console.log(res);
      },
    });
    alert(`Fournisseur ajoutee : ${this.fournisseur.nom}`);
    this.router.navigate(['admin/listesutilisateurs']);
  }
  updateFournisseur(){
    this.founisseurService.updateFournisseur(this.fournisseur,this.fournisseur.id).subscribe(res =>{
        this.getFournisseurData();
        this.router.navigate(['admin/listesutilisateurs']);
      },error => {
        console.error('Erreur lors de la modifiacation du fournisseur:', error);
        alert('Une erreur est survenue lors de modifiacation du fournisseur.');
      }
    );
  }

  getFournisseurData(){
    this.founisseurService.getAllFournisseur().subscribe(res =>{
      this.founisseurs = res;
      console.log(res);
    });
  }

  ngOnInit() {
    this.fournisseur = new Fournisseur();
    this.isAddForm = this.router.url.includes("fournisseur");
  }

}