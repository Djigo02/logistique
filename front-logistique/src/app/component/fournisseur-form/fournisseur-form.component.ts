import {Component, Input, OnInit} from '@angular/core';
import {Fournisseur} from "../../model/fournisseur";
import {FournisseurService} from "../../service/fournisseur.service";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-fournisseur-form',
  templateUrl: './fournisseur-form.component.html',
  styleUrls: ['./fournisseur-form.component.css']
})
export class FournisseurFormComponent implements OnInit{

  @Input()fournisseur!:Fournisseur;
  founisseurs : Fournisseur[]=[];
  isAddForm!:boolean;
  constructor(private founisseurService:FournisseurService,private  router:Router,private notification :ToastrService) {
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
    this.notification.success(`Fournisseur ajoute avec success`,"Operation success");
    this.router.navigate(['admin/listesutilisateurs']);
  }
  updateFournisseur(){
    this.founisseurService.updateFournisseur(this.fournisseur,this.fournisseur.id).subscribe(res =>{
        this.getFournisseurData();
        this.notification.success(`Fournisseur modifier avec success`,"Operation success");
        this.router.navigate(['admin/listesutilisateurs']);
      },error => {
        console.error('Erreur lors de la modifiacation du fournisseur:', error);
        this.notification.error(`Erreur lors de la modification`,"Operation echouer");
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
