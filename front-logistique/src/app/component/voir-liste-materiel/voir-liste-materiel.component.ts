import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Materiel} from "../../model/materiel";
import {VoirListeMaterielService} from "../../service/voir-liste-materiel.service";
import {CampusService} from "../../service/campus.service";
import {SalleService} from "../../service/salle.service";
import {UserService} from "../../service/user.service";

@Component({
  selector: 'app-voir-liste-materiel',
  templateUrl: './voir-liste-materiel.component.html',
  styleUrls: ['./voir-liste-materiel.component.css']
})

export class VoirListeMaterielComponent implements OnInit {

  // L'entite concerner
  entite!:any;
  // Nom a afficher
  nomAffichage!:string;
  materiels: Materiel[] = [];
  nomTable!:string;
  concerne_id!:string;
  constructor(private url:ActivatedRoute, private router: Router,
              private voirMaterielService: VoirListeMaterielService, private campusService:CampusService,
              private salleService: SalleService,private userService:UserService
  ) { }
  ngOnInit() {
    this.concerne_id = this.url.snapshot.params['id'];
    // recuperer les tables concernes au chargement
    if(this.router.url.includes('campus')){
      this.nomTable = 'campuses';
      this.campusService.getCampusById(this.concerne_id).subscribe(data =>{
        this.entite = data;
        this.nomAffichage = this.entite.nomCampus;
      });
    }else if(this.router.url.includes('salle')){
      this.nomTable ='salles';
      this.salleService.getSalleById(this.concerne_id).subscribe(data => {
        this.entite = data;
        this.nomAffichage = this.entite.nomSalle;
      });
    }else if(this.router.url.includes('personnel')){
      this.nomTable ='users';
      this.userService.getUserById(this.concerne_id).subscribe(data => {
        this.entite = data;
        this.nomAffichage = `${this.entite.prenom} ${this.entite.nom}`;
      });
    }

    this.voirMaterielService.getMateriels(this.nomTable, this.concerne_id).subscribe(data => {
      this.materiels = data;
      console.log(this.materiels);
    });
  }

}
