import {Component, OnInit} from '@angular/core';
import {Fournisseur} from "../../../model/fournisseur";
import {FournisseurService} from "../../../service/fournisseur.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-edit-fournisseur',
  templateUrl: './edit-fournisseur.component.html',
  styleUrls: ['./edit-fournisseur.component.css']
})
export class EditFournisseurComponent implements OnInit{

  fournisseur!:any;


  constructor(private fournisseurService:FournisseurService,private router:ActivatedRoute) {

  }


  getFournisseur(){
    this.fournisseurService.getFournisseurById(this.router.snapshot.params['id']).subscribe(res =>{
      this.fournisseur=res;
    })
  }
  ngOnInit() {
  this.getFournisseur();
  }

}
