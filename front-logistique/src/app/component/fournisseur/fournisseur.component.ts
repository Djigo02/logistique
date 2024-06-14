import {Component, OnInit} from '@angular/core';
import {FournisseurService} from "../../service/fournisseur.service";
import {Fournisseur} from "../../model/fournisseur";

@Component({
  selector: 'app-fournisseur',
  templateUrl: './fournisseur.component.html',
  styleUrls: ['./fournisseur.component.css']
})
export class FournisseurComponent implements OnInit{

  founisseur!:any;
  constructor(private fournisseurService:FournisseurService) {
  }

  ngOnInit() {
    this.founisseur = new Fournisseur();
  }



  getFournisseur(){
    this.fournisseurService.getAllFournisseur().subscribe(res => {
      this.founisseur=res;
    })
  }
}
